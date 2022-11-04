const { Router} = require('express');
const { check } = require('express-validator');
const { crearProducto } = require('../controllers/productos');
const { existeCategoriaByName } = require('../helpers/dbValidators');

const {
    validarCampos,
    validarJWT,
    validarRol,
    tieneRole
  } = require('../middlewares');
  const router = new Router();

  //Crear producto - privado - cualquier usuario -USER_ROLE
  router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('categoria','La categoria es obligatorio').notEmpty(),
    check('categoria').custom(existeCategoriaByName),
    validarCampos
    ],crearProducto);


module.exports = router;