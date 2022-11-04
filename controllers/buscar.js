const {ObjectId} = require('mongoose').Types;
const { Producto, Categoria,Usuario} = require('../models');
const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuarios = async (termino = '', res)=>{
    const esMongoID = ObjectId.isValid(termino);

    if( esMongoID ){
        const usuario = await Usuario.findById(termino);
        res.json({
            result: (usuario) ? [usuario] : []
        });

    } //else {
    //     return res.json({ message :'Mongo no válido'})
    // }

    const reqex = new RegExp( termino, 'i');

    const usuarios = await Usuario.find({
         $or: [{nombre:reqex, estado: true}, { correo: reqex, estado: true}],
         $and: [{estado: true}] 
     } );

    res.json({usuarios});
}

const buscarCategorias = async (termino = '', res)=>{
    const esMongoID = ObjectId.isValid(termino);

    if( esMongoID ){
        const categoria = await Categoria.findById(termino);
        res.json({
            result: (categoria) ? [categoria] : []
        });

    }

    const reqex = new RegExp( termino, 'i');

    const categorias = await Categoria.find({
         $or: [{nombre:reqex, estado: true}]
     } );

    res.json({categorias});
}

const buscarProductos = async (termino = '', res)=>{
    const esMongoID = ObjectId.isValid(termino);

    if( esMongoID ){
        const producto = await Producto.findById(termino);
        res.json({
            result: (producto) ? [producto] : []
        });

    }

    const reqex = new RegExp( termino, 'i');

    const productos = await Producto.find({
         $or: [{nombre:reqex, estado: true}]
     } );

    res.json({productos});
}




const buscar = (req, res)=> {
    const { coleccion, termino} = req.params;
    
    if(!coleccionesPermitidas.includes(coleccion)){
      return res.status(404).json({ error: "No se encuentra la coleción" });

    }

    switch (coleccion){
        case 'usuarios':
            buscarUsuarios(termino, res);
        break;
        case 'productos':
            buscarProductos(termino, res);
        break;
        case 'categorias':
            buscarCategorias(termino, res);
        break;
        default:
    }


    //res.status(200).send({message : 'OK BUSQUEDA', coleccion : coleccion, termino : termino});
}

module.exports = {
    buscar
}