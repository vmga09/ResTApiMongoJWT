const validarCampos = require('../middlewares/validarCampos');
const validarJWT = require('../middlewares/validarJWT');
const validarRol = require('../middlewares/validarRol');

module.exports = {
    ...validarCampos, //exporta todo lo que contenga el archivo validarCampos
    ...validarJWT,    // IDEM
    ...validarRol     // IDEM
}