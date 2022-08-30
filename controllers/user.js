//const {response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');




const usuariosGet = async(req, res ) => {
    const {limite = 5, desde = 0} = req.query;



    // const usuarios = await Usuario.find({estado : true})
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments({estado : true});
    
    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments({estado : true}),
        Usuario.find({estado : true})
        .skip(Number(desde))
        .limit(Number(limite))
    ])


    res.json({ total, usuarios});
}


const usuariosPost = async (req, res ) => {
//    const body = req.body;

console.log ('aqui paso')

   

    const {nombre, correo, password,rol} = req.body;
    const usuario = new Usuario({nombre, correo, password,rol});

    // Varificar Correo
  


    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = await bcryptjs.hash(password, salt);

    try {
        await usuario.save();
        res.status(200).json({
            "usuario": usuario,
            usuario
        });

        
    } catch (error) {
        res.status(500).json({
            "error": error.message
        })
        
    }
    

   
}

const usuariosPut = async (req, res ) => {
    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;
    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = await bcryptjs.hash(password, salt);

    }
    const usuario = await Usuario.findByIdAndUpdate(id,resto);
    res.status(200).json({
        "msg":" PUT From Controller",
        id
    });
}

const usuariosDelete = async (req, res ) => {
    const {id} = req.params;
    //Borrado fisico
    //const usuario = await Usuario.findByIdAndDelete(id);

    //Borrado lógico
    // const usuario = await Usuario.findByIdAndUpdate(id,{estado : false});
    // const result = await Usuario.findById(id);


    const [usuarios, resultado,user ] = await  Promise.all([
        Usuario.findByIdAndUpdate(id,{estado : false}),
        Usuario.findById(id),
        req.user
    ])
    res.status(200).json({
        "msg":`Delete ${id} Antes : ${usuarios.estado} Despues: ${resultado.estado}`,
        user
    });
}

const adminGet = (req, res ) => {
    res.status(200).json({
        "msg":"GET  ADMIN  From   Controller"
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    adminGet
}