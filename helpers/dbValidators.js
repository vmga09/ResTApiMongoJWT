const role = require('../models/role');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');

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


const existeCategoriaByName = async(name) =>{
      const  nombre = name.toUpperCase(); 
    const categoriaDB = await Categoria.findOne({ nombre });
    if (!categoriaDB) {
        throw new Error(`El ${name} no esta registrado`);
    }

}




module.exports = { 
    esRoleValido,
    existeEmail,
    existeId,
    existeCategoria,
    existeCategoriaByName
}