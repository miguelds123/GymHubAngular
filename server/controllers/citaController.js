// controllers/citaController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { startOfDay, endOfDay } = require('date-fns');
const ENCARGADO_ID = 3; // ID del encargado que se quiere consultar
// Obtener información completa de la(s) reserva(s) con opción de filtrar por cliente (usuarioId) y/o fecha
exports.getCitas = async (req, res, next) => {
    const { idCita, usuarioId, fecha } = req.query;

    try {
        // Construir los filtros de la consulta según los parámetros proporcionados
        const whereClause = {};

        if (idCita) {
            whereClause.id = parseInt(idCita);
        }

        if (usuarioId) {
            whereClause.usuarioId = parseInt(usuarioId);
        }

        if (fecha) {
            const date = new Date(fecha);
            whereClause.fecha = {
                gte: startOfDay(date),
                lt: endOfDay(date),
            };
        }

        const reservas = await prisma.cita.findMany({
            where: whereClause,
            include: {
                sucursal: true,
                usuario: true,
                servicio: true,
            },
        });

        if (reservas.length === 0) {
            return res.status(404).json({ error: 'No se encontraron reservas con los criterios proporcionados' });
        }

        const informacionReservas = reservas.map(reserva => {
            const { fecha, horaInicio, horaFin, estado, objetivoEntrenamiento, nivelExperiencia, condicionesMedicas } = reserva;

            return {
                fecha,
                horaInicio,
                horaFin,
                sucursal: reserva.sucursal.nombre,
                servicio: reserva.servicio.nombre,
                objetivoEntrenamiento,
                nivelExperiencia,
                condicionesMedicas,
                estado,
            };
        });

        res.json(informacionReservas);
    } catch (error) {
        console.error('Error al obtener la información de las reservas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.createCita = async (req, res, next) => {
    const {
        fecha,
        horaInicio,
        horaFin,
        estado,
        sucursalId,
        usuarioId,
        servicioId,
        encargadoId,
        condicionesMedicas,
        nivelExperiencia,
        objetivoEntrenamiento
    } = req.body;

    const encargado= await prisma.usuario.findUnique({
        where: { 
            id: encargadoId,
            role: 'ENCARGADO'
        }
    })
    if (!encargado) {
        return res.status(404).json({ error: 'No existe el encargado' });
    }
  // Mapear el número del día de la semana a su nombre en español
  const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  const diaSemana = diasSemana[new Date(fecha).getDay()]; // Obtener el nombre del día de la semana

  console.log(`Día de la semana: ${diaSemana}`);

  // Paso 1: Verificar que la cita esté dentro del horario establecido de la sucursal
  const horarios = await prisma.horario.findMany({
      where: {
          sucursalId: sucursalId,
          diaSemana: diaSemana,
      },
  });

  console.log('Horarios obtenidos de la BD:', horarios);

  const citaInicio = new Date(horaInicio + ' GMT-0000');
  const citaFin = new Date(horaFin + ' GMT-0000');

  console.log('Cita Inicio:', citaInicio);
  console.log('Cita Fin:', citaFin);

  const horarioValido = horarios.some(horario => {
      // Asegurarse de que las fechas estén en el mismo formato y zona horaria
      const horarioInicio = new Date(horario.horaInicio);
      const horarioFin = new Date(horario.horaFin);
      
      console.log('Horario Inicio:', horarioInicio);
      console.log('Horario Fin:', horarioFin);

      // Verificar que la cita esté dentro del rango de horario
      const valido = citaInicio >= horarioInicio && citaFin <= horarioFin;
      console.log(`Es horario válido: ${valido}`);
      return valido;
  });

  if (!horarioValido) {
      return res.status(400).json({ error: 'La cita está fuera del horario de la sucursal' });
  }

  // Paso 2: Verificar que la cita no coincida con un bloqueo de la sucursal
  const bloqueos = await prisma.horarioBloqueo.findMany({
      where: {
          sucursalId: sucursalId,
          diaSemana: diaSemana,
          OR: [
              { 
                  horaInicio: { lte: citaFin },
                  horaFin: { gte: citaInicio }
              }
          ]
      }
  });

  console.log('Bloqueos obtenidos de la BD:', bloqueos);

  const bloqueoValido = bloqueos.every(bloqueo => {
      const bloqueoInicio = new Date(bloqueo.horaInicio);
      const bloqueoFin = new Date(bloqueo.horaFin);
      console.log('Bloqueo Inicio:', bloqueoInicio);
      console.log('Bloqueo Fin:', bloqueoFin);
      const noCoincideConBloqueo = citaFin <= bloqueoInicio || citaInicio >= bloqueoFin;
      console.log(`No coincide con bloqueo: ${noCoincideConBloqueo}`);
      return noCoincideConBloqueo;
  });

  if (!bloqueoValido) {
      return res.status(400).json({ error: 'La cita coincide con un bloqueo de la sucursal' });
  }
    try {
        const nuevaCita = await prisma.cita.create({
            data: {
                fecha: new Date(fecha),
                horaInicio: new Date(horaInicio),
                horaFin: new Date(horaFin),
                estado,
                sucursalId,
                usuarioId,
                servicioId,
                encargadoId,
                condicionesMedicas,
                nivelExperiencia,
                objetivoEntrenamiento,
            },
            include: {
                sucursal: true,
                usuario: true,
                servicio: true,
            },
        });

        const subtotal = nuevaCita.servicio.tarifa;
        const total = subtotal; 

        const nuevaProforma = await prisma.proforma.create({
            data: {
                citaId: nuevaCita.id,
                clienteId: nuevaCita.usuarioId,
                sucursalId: nuevaCita.sucursalId,
                servicioId: nuevaCita.servicioId,
                cantidad: 1,
                subtotal: subtotal,
                total: total,
                fechaRerserva: nuevaCita.fecha,
            },
        });

        res.status(201).json({
            mensaje: 'Cita y factura proforma creadas exitosamente',
            cita: nuevaCita,
            proforma: nuevaProforma,
        });
    } catch (error) {
        console.error('Error al crear la cita y la factura proforma:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.getCitasEncargado = async (req, res, next) => {
    // Extraer el id del objeto `req.params`
    const encargadoId = parseInt(req.params.id, 10);

    console.log('Encargado ID recibido:', encargadoId);

    try {
        const citas = await prisma.cita.findMany({
            where: {
                encargadoId: encargadoId // Usa el número directamente aquí
            },
            include: {
                sucursal: true,
                usuario: true,
                servicio: true,
            },
        });

        if (citas.length === 0) {
            return res.status(404).json({ error: 'No se encontraron citas para este encargado.' });
        }

        const informacionCitas = citas.map(cita => {
            const { id, fecha, horaInicio, horaFin, estado } = cita;
            let colorEstado;

            switch (estado) {
                case 'PENDIENTE':
                    colorEstado = 'Amarillo';
                    break;
                case 'CONFIRMADA':
                    colorEstado = 'Verde';
                    break;
                case 'COMPLETADA':
                    colorEstado = 'Gris';
                    break;
                case 'REPROGRAMADA':
                    colorEstado = 'Blanco';
                    break;
                case 'CANCELADA':
                    colorEstado = 'Rojo';
                    break;
                default:
                    colorEstado = 'Desconocido';
            }

            return {
                id,
                fecha,
                horaInicio,
                horaFin,
                sucursal: cita.sucursal.nombre,
                cliente: cita.usuario.nombre,
                servicio: cita.servicio.nombre,
                estado,
                colorEstado,
            };
        });

        res.json(informacionCitas);
    } catch (error) {
        console.error('Error al obtener las citas del encargado:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.getCitaById = async (req, res, next) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    try {
        const cita = await prisma.cita.findUnique({
            where: { id },
            include: {
                sucursal: true,
                usuario: true,
                servicio: true,
            },
        });

        if (!cita) {
            return res.status(404).json({ error: "Cita no encontrada" });
        }

        // Opcional: Puedes agregar una lógica para determinar el color del estado aquí, si es necesario.
        const estadoColorMap = {
            'PENDIENTE': 'Amarillo',
            'CONFIRMADA': 'Verde',
            'COMPLETADA': 'Gris',
            'REPROGRAMADA': 'Blanco',
            'CANCELADA': 'Rojo'
        };

        const colorEstado = estadoColorMap[cita.estado] || 'Blanco';

        res.json({
            ...cita,
            colorEstado
        });
    } catch (error) {
        console.error("Error al obtener la cita:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
