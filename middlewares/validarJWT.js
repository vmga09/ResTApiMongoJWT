const jwt = require("jsonwebtoken");
const usuario = require("../models/usuario");

const validarJWT = async(req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({ message: "No hay token" });
  } else {
    try {
      const { uid } = jwt.verify(token, process.env.SECRETKEY);
      const user = await usuario.findById(uid);

      // Verificar si el usuario existe
      if(!user){ 
        return res.status(401).json({ message: "Usuario no encontrado" });
      }
      //Verifica si el usuario esta habilitado
      console.log(user.estado)
      if(!user.estado){ 
        return res.status(401).json({ message: "Usuario no habilitado" });
      }
      
      
      req.uid = uid;
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token no válido" });
    }
  }
};

module.exports = {
  validarJWT,
};