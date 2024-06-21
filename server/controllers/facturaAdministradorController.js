const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
    let idUsuario=parseInt(request.params.id)
    const factura=await prisma.factura.findMany({
        where: { 
            cliente: {
                id: idUsuario,
                // Verificamos que el sucursalId del cliente coincida con el sucursalId de la factura
                sucursalId: {
                    equals: prisma.factura.sucursalId
                }
            }
         },
        orderBy:{
            fecha: 'asc'
        },
        include:{
            cliente:true,
            sucursal: true,
        }
    })
    response.json(factura)
}