const { Producto, Categoria }  = require('../models/');

//Listar todos los productio 
const listarProducto = async (req, res) => {
    try {
      const [total, listado] = await Promise.all([
        Producto.countDocuments({ estado: true }),
        Producto.find({ estado: true }).populate("usuario", "nombre")
        .populate("categoria", "nombre"),
      ]);
      res.status(200).json({ total, listado });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

//Listar productos por ID

const listarProductoId = async (req, res) => {
    const id = req.params.id;
    try {
      const unProducto = await Producto.findById(id).populate(
        "usuario",
        "nombre"
      )
      .populate('categoria','nombre');
      if (!unProducto) {
        return res.status(404).json({ error: "No se encuentra el producto" });
      }
      if (!unProducto.estado) {
        return res
          .status(404)
          .json({ error: "No se encuentra el producto - false" });
      }
      res.status(201).json(unProducto);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

// Crear producto  
const crearProducto = async (req, res) => {

    const nombre = req.body.nombre.toUpperCase();
    const categoria = req.body.categoria.toUpperCase();  
    console.log(nombre);     
           
    const  {precio,
           descripcion } = req.body;

       console.log(typeof(precio))
     if (typeof(precio) !=='undefined' && typeof(precio)!== 'number'){
        return res
        .status(404)
        .json({ message: `El producto ${precio} no es un numero` });
     }
    //Verificar si el producto existe en la base de datos
    const productoDB = await Producto.findOne({ nombre });
    if (productoDB) {
      return res
        .status(404)
        .json({ message: `El producto ${nombre} ya existe` });
    }

    //Genera la data a guardar
    const data = {
      nombre,
      categoria,
      usuario: req.uid,
      precio,
      descripcion
    };
  
    const producto = new Producto(data);
    //Guardar en la base de datos
    await producto.save();
  
    res.status(201).json(producto);
  };



// actualizar categoría

const actualizarProducto = async (req, res) => {

    console.log('AQUIIIIIIIIIII',req.body)
    try {
      const id = req.params.id;
      const { estado, usuario, ...data } = req.body;
      data.nombre = data.nombre.toUpperCase();
      data.usuario = req.uid;
      const producto = await Producto.findByIdAndUpdate(id, data, {
        new: true,
      }).populate("usuario", "nombre")
      .populate("categoria", "nombre");
      res.status(200).json(producto);
    } catch (error) {
      res.status(404).json({ error });
    }
  };

// borrar Producto - false

const delProducto = async (req, res) => {
    const id = req.params.id;
    const [cate, resultado] = await Promise.all([
      Producto.findByIdAndUpdate(id, { estado: false }),
      Producto.findById(id),
    ]);
    res.status(200).json({
      msg: `Delete ${id} Antes : ${cate.estado} Despues: ${resultado.estado}`,
    });
  };

  module.exports = {
    crearProducto,
    listarProducto,
    listarProductoId,
    actualizarProducto,
    delProducto
  }