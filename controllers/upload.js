const { response } = require('express');
const { uploadFile } = require('../helpers');
const { Usuario, Producto } = require('../models');

const cargarArchivo = async (req, res) => {
  // Consulta si hay algún archivo cargado
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.files) {
    res.status(400).json({ msg: "No files were uploaded." });
    return;
  }

  try {
    //const completePath = await uploadFile(req.files,['txt','md'],'text');
    const completePath = await uploadFile(req.files,undefined,'img');
    res.json({
      path: completePath,
    });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
}


const imageUpdate = async (req, res) => {

    const { collection,id} = req.params
    let model;
    switch (collection) {
      case 'usuarios':
          model = await Usuario.findById(id);
          if (!model){
            return res.status(404).json({ 
              msg: `El ${id} no esta registrado`
            });
          }
        break;
        case 'productos':
          model = await Producto.findById(id);
          if (!model){
            return res.status(404).json({ 
              msg: `El ${id} no esta registrado`
            });
          }
        break;
      default:
        return res.status(500).json({ msg: 'Not found' });
    }

      model.img = await  uploadFile(req.files,undefined,collection);
      await model.save();

    res.json({ model });



};


module.exports = {
    cargarArchivo,
    imageUpdate
} 