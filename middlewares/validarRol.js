const usuario = require("../models/usuario");

const validarRol = async (req,res,next)=>{
    const id = req.uid;
    const user = await usuario.findById(id);
    if(user.rol !== 'ADMIN_ROLE'){
        res.status(401).json({message: 'No es autorizado'});
    }else {
        next();
    }
}


const tieneRole = (...roles) => {
    return (req,res ,next)=>{
            if(!req.user){
                return res.status(500).json({message: 'Se quiere verificar el role sin validar primero'});
            }
            if(!roles.includes(req.user.rol)){
                console.log(roles,req.user.rol);
                return res.status(400).json({message: 'Usuario no autorizado'});
            }
        
        next();
    }
   
}


module.exports = {
    validarRol,
    tieneRole
}