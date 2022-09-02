const role = require('../models/role');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const Producto = require('../models/producto');

const esRoleValido = async (rol = '')=>{
    const existeRol = await role.findOne({rol});
    if(!existeRol) throw new Error(`Role ${rol} No esrta registrado`)
}
const existeEmail = async (correo = '') => {
    console.log('AQUI')
    const email = await Usuario.findOne({correo});
    if (email){
        throw new Error(`Correo ${correo} esta registrado`);
    }
}

const existeId = async (id) => {
    const existeID = await Usuario.findById(id);
    if (!existeID){
        throw new Error(`El ${id} no esta registrado`);
    }
}


const existeCategoria = async (id) => {
    const existeID = await Categoria.findById(id);
    if (!existeID){
        throw new Error(`El ${id} no esta registrado`);
    }
}

const existeCategoriaValida = async (id) => {
    const existeID = await Categoria.findById(id);
    if (!existeID.estado){
        throw new Error(`El ${id} no es válido`);
    }
}

const existeProducto = async (id) => {
    console.log('Producto no wea')
    const existeID = await Producto.findById(id);
    if (!existeID){
        throw new Error(`El ${id} del producto no esta registrado`);
    }
}

module.exports = { 
    esRoleValido,
    existeEmail,
    existeId,
    existeCategoria,
    existeCategoriaValida,
    existeProducto
}