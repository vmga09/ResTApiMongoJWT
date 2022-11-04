const path = require('path');
const { v4 : uuidv4 } = require('uuid');   
   
   const uploadFile = (file, extValid = ['png', 'jpg', 'jpeg','PNG','gif'], directory = '') => {

    //console.log(files);

    return new Promise((resolve, reject) => {

        const files  = file.files;
        
        const filesCut = files.name.split(".");
        const ext = filesCut[filesCut.length -1];
     
        //Validar extension
        if (!extValid.includes(ext)){
            return reject( 'Invalid extension' )
        }
     
        console.log(ext);
        const nameTemp = uuidv4()+'.'+ext;
        const uploadPath = path.join(__dirname ,'../uploads/', directory, nameTemp);
         files.mv(uploadPath, (err)=> {
           if (err) {
             return reject({msg: 'File uploaded to ' + uploadPath + ' '+err});
           }
             return resolve(nameTemp);
         });





    })

 


   }

   module.exports = {
        uploadFile
   }