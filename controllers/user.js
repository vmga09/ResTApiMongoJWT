//const {response} = require('express');


const usuariosGet = (req, res ) => {
    const query = req.query;
    res.status(200).json({
        "msg":"GET From Controller",
        query
    });
}


const usuariosPost = (req, res ) => {
    const {usuario, edad} = req.body;

    res.status(200).json({
        "usuario": usuario,
        "edad":edad
    });
}

const usuariosPut = (req, res ) => {
    const {id} = req.params
    res.status(200).json({
        "msg":" PUT From Controller",
        id
    });
}

const usuariosDelete = (req, res ) => {
    res.status(200).json({
        "msg":" Delete From Controller"
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