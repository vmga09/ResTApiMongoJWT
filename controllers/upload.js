const path = require('path');
const { v4 : uuidv4 } = require('uuid');

const cargarArchivo = (req, res) => {
    
    // Consulta si hay algún archivo cargado
    if (!req.files || Object.keys(req.files).length === 0 ||!req.files.files ) {
      res.status(400).json({msg: 'No files were uploaded.'});
      return;
    }

   const { files } = req.files;
   const filesCut = files.name .split(".");
   const ext = filesCut[filesCut.length -1];

   //Validar extension
   const extValid = ['png', 'jpg', 'jpeg', 'gif'];
   if (!extValid.includes(ext)){
        res.status(400).json({msg: 'Invalid extension'});
   }

   console.log(ext);
   const nameTemp = uuidv4()+'.'+ext;
   const uploadPath = path.join(__dirname ,'../uploads/',nameTemp);
    files.mv(uploadPath, (err)=> {
      if (err) {
        return res.status(500).json({msg: err});
      }
      res.json({msg: 'File uploaded to ' + uploadPath});
    });

    
}

module.exports = {
    cargarArchivo
} 