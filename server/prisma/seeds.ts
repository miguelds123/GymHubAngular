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
    //Usuarios - no tiene relaciones
    await prisma.usuario.createMany({
      data: usuarios,
    });
    //Servicio - no tiene relaciones
    await prisma.servicio.createMany({
      data: servicios,
    });
    //Sucursal - no tiene relaciones
    await prisma.sucursal.createMany({
        data: sucursales,
    })
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
        clienteId: 4,
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
  } catch (error) {
    throw error;
  }
};
main().catch((err) => {
  console.warn('Error al ejecutar el seeder:\n', err);
});
