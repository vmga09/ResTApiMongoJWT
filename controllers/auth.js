const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { getJWT } = require('../helpers/auth-jwt');

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

module.exports = {
    login
}