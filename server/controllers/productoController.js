const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los productos
exports.getAllProductos = async (req, res, next) => {
    try {
        const productos = await prisma.producto.findMany();
        res.json(productos);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Obtener un producto por su ID
exports.getProductoById = async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        const producto = await prisma.producto.findUnique({
            where: { id }
        });
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json(producto);
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Crear un nuevo producto
exports.createProducto = async (req, res, next) => {
    const { nombre, descripcion, categoria, precio, peso, marca, imagen } = req.body;
    try {
      const nuevoProducto = await prisma.producto.create({
        data: {
          nombre,
          descripcion,
          categoria,
          precio , // Asegúrate de que el precio se esté manejando como un número
          peso, // Asegúrate de que el peso se esté manejando como un número
          marca,
          imagen
        }
      });
      res.status(201).json(nuevoProducto);
    } catch (error) {
      console.error("Error al crear el producto:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };

// Actualizar un producto existente
exports.updateProducto = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const { nombre, descripcion, categoria, precio, peso, marca } = req.body;
    try {
        const productoActualizado = await prisma.producto.update({
            where: { id },
            data: {
                nombre,
                descripcion,
                categoria,
                precio,
                peso,
                marca
            }
        });
        res.json(productoActualizado);
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Eliminar un producto por su ID
exports.deleteProducto = async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.producto.delete({
            where: { id }
        });
        res.status(204).end();
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
