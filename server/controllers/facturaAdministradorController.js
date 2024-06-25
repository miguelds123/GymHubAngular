const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
    let idUsuario = parseInt(request.params.id);

    // Obtener el sucursalId del usuario especificado
    const usuario = await prisma.usuario.findUnique({
        where: { id: idUsuario },
        select: { sucursalId: true }
    });

    if (!usuario || !usuario.sucursalId) {
        return response.status(404).json({ error: 'Usuario no encontrado o no tiene una sucursal asignada' });
    }
    const factura=await prisma.factura.findMany({
        where: {
            sucursalId: usuario.sucursalId
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