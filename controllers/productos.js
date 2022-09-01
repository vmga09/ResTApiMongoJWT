const { Producto, Categoria }  = require('../models/');

const crearProducto = async (req, res) => {

    const nombre = req.body.nombre.toUpperCase();
    const categoria = req.body.categoria.toUpperCase();  
    console.log(nombre);     
           
    const  {precio,
           descripcion } = req.body;

    //Verificar si el producto existe en la base de datos
    const productoDB = await Producto.findOne({ nombre });
    if (productoDB) {
      return res
        .status(404)
        .json({ message: `El producto ${nombre} ya existe` });
    }

    //Verificar si la categoria existe en la base de datos
    const categoriaDB = await Categoria.findOne({ nombre:categoria });
    if (!categoriaDB) {
      return res
        .status(404)
        .json({ message: `La categoria ${categoria} no  existe` });
    }
    
    if(!typeof precio === 'number'){
        return res
        .status(404)
        .json({ message: `El valor precio ${precio} no es un numero` }); 
    }

    //Genera la data a guardar
    const data = {
      nombre,
      categoria : categoriaDB.nombre,
      usuario: req.uid,
      precio,
      descripcion
    };
  
    const producto = new Producto(data);
    //Guardar en la base de datos
    await producto.save();
  
    res.status(201).json(producto);
  };

  module.exports = {
    crearProducto
  }