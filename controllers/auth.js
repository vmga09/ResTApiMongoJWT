const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { getJWT } = require('../helpers/auth-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res) => {
    const { correo , password } = req.body;

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(404).json({
                msg:'Usuario / Password  no son correctos'
            });
        }    
        // Verificar si el usuario esta activo
        if(!usuario.estado){
            return res.status(404).json({
                msg:'Usuario no válido'
            });
        }  
        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(404).json({
                msg:'Usuario / Password  no son correctos'
            });
        }


        // Genera el JWT

        const token = await getJWT(usuario.id);


        res.json({
            msg:'Login successful',
            usuario:usuario,
            token: token
        })
        
    } catch (error) {
        return res.status(500).json({msg : `Error ${error}`});
    }
     
};


const googleSignIn = async(req,res)=>{
        const {id_token} = req.body;
       
        try {
            const {nombre, correo, img} = await googleVerify(id_token);
            let usuario = await Usuario.findOne({correo});
            
            //Pregunta si el ususario existe
            if(!usuario){
                console.log('Usuario no existe')
                // Se debe crear el usuario
                const data = {
                    nombre,
                    correo,
                    password:' ',
                    img,
                    rol:'USER_ROLE',
                    google:true
                };

                usuario = new Usuario(data);
                await usuario.save();
            }

            //Si el usuario existe , se verifica si esta habilitado
            if(!usuario.estado){
                return res.status(401).json({ message: 'Usuario no habilitado, hable con el administrador'
            })
        }
       
        const token = await getJWT(usuario.id);
        res.json({ usuario,token})

        } catch (error) {
        res.status(500).json({
            msg: 'ERROR',
            error
        })
            
        }
       

}

module.exports = {
    login,
    googleSignIn
}