const { Router} = require('express');
const { check } = require('express-validator');
const { esRoleValido, existeEmail,existeId } = require('../helpers/dbValidators');
// const { validarCampos } = require('../middlewares/validarCampos');
// const { validarJWT } = require('../middlewares/validarJWT');
// const { validarRol, tieneRole } = require('../middlewares/validarRol');

const {
        validarCampos,
        validarJWT,
        validarRol,
        tieneRole
      } = require('../middlewares');

const user = require('./../controllers/user');
const router = Router();

router.get('/',user.usuariosGet );
router.put('/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeId),
    check('rol').custom(esRoleValido),
    validarCampos
    
],user.usuariosPut);
router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe tener mas de 6 letras').isLength({min:6}),
    check('correo').custom(existeEmail),
    check('correo','El correo no es válido').isEmail(),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
]
,user.usuariosPost);
router.delete('/:id',[
    validarJWT,
    //validarRol,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeId),
    validarCampos
] ,user.usuariosDelete);


module.exports = router;