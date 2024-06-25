import { PrismaClient } from '@prisma/client';
import { productos } from './seeds/productos';
import { usuarios } from './seeds/usuarios';
import { servicios } from './seeds/servicios';
import { sucursales } from './seeds/sucursales';

const prisma = new PrismaClient();
const main = async () => {
  try {
    //Producto - no tiene relaciones
    await prisma.producto.createMany({
      data: productos,
    });
    //Servicio - no tiene relaciones
    await prisma.servicio.createMany({
      data: servicios,
    });
    //Sucursal - no tiene relaciones
    await prisma.sucursal.createMany({
        data: sucursales,
    })
    //Usuarios - no tiene relaciones
    await prisma.usuario.createMany({
      data: usuarios,
    });
    //Facturas con relaciones incluidas
    await prisma.factura.create({
      data: {
        fecha: new Date('2024-02-27'),
        clienteId: 4,
        sucursalId: 1, 
        total: 300000,
        estado: true,
        productos: {
          createMany: {
            data: [
              { idDetalle: 1, productoId: 1, cantidad: 1, subtotal: 300000}
            ],
          },
        },
      },
    });
    await prisma.factura.create({
      data: {
        fecha: new Date('2024-04-23'),
        clienteId: 3,
        sucursalId: 5, 
        total: 220000.00,
        estado: true,
        productos: {
          createMany: {
            data: [
              { idDetalle: 1, productoId: 1, cantidad: 1, subtotal: 120000.00}
            ],
          },
        },
        servicios:{
          createMany:{
            data: [
              { idDetalle: 2, servicioId: 1, cantidad: 1, subtotal: 100000.00}
            ]
          }
        }
      },
    });
    await prisma.factura.create({
      data: {
        fecha: new Date('2024-04-23'),
        clienteId: 4,
        sucursalId: 2, 
        total: 320000.00,
        estado: true,
        productos: {
          createMany: {
            data: [
              { idDetalle: 1, productoId: 1, cantidad: 1, subtotal: 120000.00},
              { idDetalle: 2, productoId: 2, cantidad: 1, subtotal: 60000.00}
            ],
          },
        },
        servicios:{
          createMany:{
            data: [
              { idDetalle: 3, servicioId: 1, cantidad: 1, subtotal: 100000.00},
              { idDetalle: 4, servicioId: 2, cantidad: 1, subtotal: 40000.00}
            ]
          }
        }
      },
    });
    await prisma.factura.create({
      data: {
        fecha: new Date('2024-04-23'),
        clienteId: 3,
        sucursalId: 2, 
        total: 420000.00,
        estado: true,
        productos: {
          createMany: {
            data: [
              { idDetalle: 1, productoId: 1, cantidad: 1, subtotal: 120000.00},
              { idDetalle: 2, productoId: 2, cantidad: 1, subtotal: 60000.00},
              { idDetalle: 3, productoId: 3, cantidad: 1, subtotal: 40000.00}
            ],
          },
        },
        servicios:{
          createMany:{
            data: [
              { idDetalle: 4, servicioId: 1, cantidad: 1, subtotal: 100000.00},
              { idDetalle: 5, servicioId: 2, cantidad: 1, subtotal: 40000.00},
              { idDetalle: 6, servicioId: 3, cantidad: 1, subtotal: 60000.00}
            ]
          }
        }
      },
    });

    //Citas para sucursal 1

    await prisma.cita.create({
      data: {
        fecha: new Date("2024-07-01"),
        horaInicio: new Date("2024-07-01T09:00:00"),
        horaFin: new Date("2024-07-01T10:00:00"),
        estado: "CONFIRMADA",
        sucursal: {
          connect: { id: 1 }
        },
        usuario: {
          connect: { id: 3 }
        },
        servicio: {
          connect: { id: 1 }
        },
        objetivoEntrenamiento: "Mejorar condición física",
        nivelExperiencia: "Intermedio",
        condicionesMedicas: "Ninguna"
      }
    });

    await prisma.cita.create({
      data: {
        fecha: new Date("2024-07-02"),
        horaInicio: new Date("2024-07-02T10:00:00"),
        horaFin: new Date("2024-07-02T11:00:00"),
        estado: "REPROGRAMADA",
        sucursal: {
          connect: { id: 1 }
        },
        usuario: {
          connect: { id: 4 }
        },
        servicio: {
          connect: { id: 2 }
        },
        objetivoEntrenamiento: "Perder peso",
        nivelExperiencia: "Principiante",
        condicionesMedicas: "Asma"
      }
    });

    await prisma.cita.create({
      data: {
        fecha: new Date("2024-07-03"),
        horaInicio: new Date("2024-07-03T11:00:00"),
        horaFin: new Date("2024-07-03T12:00:00"),
        estado: "CONFIRMADA",
        sucursal: {
          connect: { id: 1 }
        },
        usuario: {
          connect: { id: 3 }
        },
        servicio: {
          connect: { id: 3 }
        },
        objetivoEntrenamiento: "Aumentar masa muscular",
        nivelExperiencia: "Avanzado",
        condicionesMedicas: "Ninguna"
      }
    });

    //citas sucursal 2

    await prisma.cita.create({
      data: {
        fecha: new Date("2024-07-01"),
        horaInicio: new Date("2024-07-01T12:00:00"),
        horaFin: new Date("2024-07-01T13:00:00"),
        estado: "CONFIRMADA",
        sucursal: {
          connect: { id: 2 }
        },
        usuario: {
          connect: { id: 3 }
        },
        servicio: {
          connect: { id: 2 }
        },
        objetivoEntrenamiento: "Flexibilidad",
        nivelExperiencia: "Intermedio",
        condicionesMedicas: "Ninguna"
      }
    });

    await prisma.cita.create({
      data: {
        fecha: new Date("2024-07-02"),
        horaInicio: new Date("2024-07-02T13:00:00"),
        horaFin: new Date("2024-07-02T14:00:00"),
        estado: "CANCELADA",
        sucursal: {
          connect: { id: 2 }
        },
        usuario: {
          connect: { id: 4 }
        },
        servicio: {
          connect: { id: 5 }
        },
        objetivoEntrenamiento: "Mejorar condición física",
        nivelExperiencia: "Principiante",
        condicionesMedicas: "Asma"
      }
    });

    await prisma.cita.create({
      data: {
        fecha: new Date("2024-07-03"),
        horaInicio: new Date("2024-07-03T15:00:00"),
        horaFin: new Date("2024-07-03T16:00:00"),
        estado: "CONFIRMADA",
        sucursal: {
          connect: { id: 2 }
        },
        usuario: {
          connect: { id: 3 }
        },
        servicio: {
          connect: { id:3 }
        },
        objetivoEntrenamiento: "Aumentar masa muscular",
        nivelExperiencia: "Avanzado",
        condicionesMedicas: "Diabetes"
      }
    });

    // citas sucursal 5

    await prisma.cita.create({
      data: {
        fecha: new Date("2024-07-01"),
        horaInicio: new Date("2024-07-01T16:00:00"),
        horaFin: new Date("2024-07-01T17:00:00"),
        estado: "CONFIRMADA",
        sucursal: {
          connect: { id: 5 }
        },
        usuario: {
          connect: { id: 3 }
        },
        servicio: {
          connect: { id: 1 }
        },
        objetivoEntrenamiento: "Mejorar resistencia",
        nivelExperiencia: "Intermedio",
        condicionesMedicas: "Hipertensión"
      }
    });

    await prisma.cita.create({
      data: {
        fecha: new Date("2024-07-02"),
        horaInicio: new Date("2024-06-23T17:00:00"),
        horaFin: new Date("2024-06-23T18:00:00"),
        estado: "COMPLETADA",
        sucursal: {
          connect: { id: 5 }
        },
        usuario: {
          connect: { id: 4 }
        },
        servicio: {
          connect: { id: 2 }
        },
        objetivoEntrenamiento: "Perder peso",
        nivelExperiencia: "Principiante",
        condicionesMedicas: "Ninguna"
      }
    });

    await prisma.cita.create({
      data: {
        fecha: new Date("2024-07-03"),
        horaInicio: new Date("2024-07-03T18:00:00"),
        horaFin: new Date("2024-07-03T19:00:00"),
        estado: "CONFIRMADA",
        sucursal: {
          connect: { id: 5 }
        },
        usuario: {
          connect: { id: 5 }
        },
        servicio: {
          connect: { id: 3 }
        },
        objetivoEntrenamiento: "Aumentar masa muscular",
        nivelExperiencia: "Avanzado",
        condicionesMedicas: "Ninguna"
      }
    });

  } catch (error) {
    throw error;
  }
};
main().catch((err) => {
  console.warn('Error al ejecutar el seeder:\n', err);
});
