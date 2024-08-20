const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let idFactura = parseInt(request.params.id);
  const factura = await prisma.factura.findUnique({
    where: { id: idFactura },
    include: {
      cliente: true,
      sucursal: true,
      productos: {
        select: {
          idDetalle: true,
          producto: true,
          cantidad: true,
          subtotal: true,
        },
      },
      servicios: {
        select: {
          idDetalle: true,
          servicio: true,
          cantidad: true,
          subtotal: true,
        },
      },
    },
  });
  response.json(factura);
};
//Crear
module.exports.create = async (request, response, next) => {
  let infoFactura = request.body;
  const newFactura = await prisma.factura.create({
    data: {
      fecha: infoFactura.fecha,
      sucursalId: 2,
      clienteId: infoFactura.clienteId,
      total: infoFactura.total,
      estado: infoFactura.estado,
      productos: infoFactura.productos && infoFactura.productos.length > 0 ? {
        create: infoFactura.productos.map((producto, index) => ({
          idDetalle: index + 1, // Genera un idDetalle único por cada producto
          productoId: producto.productoId,
          cantidad: producto.cantidad,
          subtotal: producto.subtotal,
        })),
      } : undefined,
      servicios: infoFactura.servicios && infoFactura.servicios.length > 0 ? {
        create: infoFactura.servicios.map((servicio, index) => ({
          idDetalle: index + 1, // Genera un idDetalle único por cada servicio
          servicioId: servicio.servicioId,
          cantidad: servicio.cantidad,
          subtotal: servicio.subtotal,
        })),
      } : undefined,
    },
  });
  
  console.log(infoFactura.proformaId)

  if (infoFactura.proformaId !== undefined){
    // Actualizar el estado de la proforma a true
    await prisma.proforma.update({
      where: { id: infoFactura.proformaId }, // Asegúrate de que proformaId esté en infoFactura
      data: { estado: true },
    });
  }

  response.json(newFactura);
};
