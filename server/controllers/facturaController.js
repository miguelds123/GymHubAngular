const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let idFactura=parseInt(request.params.id)
    const factura=await prisma.factura.findUnique({
        where: { id: idFactura },
        include:{
            cliente:true,
            sucursal: true,
            productos: {
                select: {
                    idDetalle: true,
                    producto: true,
                    cantidad: true,
                    subtotal: true
                }
            },
            servicios: {
                select: {
                    idDetalle: true,
                    servicio: true,
                    cantidad: true,
                    subtotal: true
                }
            }
        }
    })
    response.json(factura)
}
//Crear
module.exports.create = async (request, response, next) => {
}