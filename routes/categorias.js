const { Router} = require('express');
const { check } = require('express-validator');
const { crearCategoria,
  listarCategoria, 
  listarCategoriaId, 
  delCategoria, 
  actualizarCategoria } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/dbValidators');

const {
    validarCampos,
    validarJWT,
    validarRol,
    tieneRole
  } = require('../middlewares');
  const router = new Router();



  // Obtener todas las categorias  - público
  router.get('/',listarCategoria);

  //Obtener una categoría por id  - público
  router.get('/:id',[
    check('id','No es un ID válido').isMongoId(),
    validarCampos
  ],listarCategoriaId);

  //Crear categorías - privado - cualquier usuario -USER_ROLE
  router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').notEmpty(),
    validarCampos
    ],crearCategoria);

//Actualizar  una categoría por id  - privado -USER_ROLE
router.put('/:id',[
  validarJWT,
  tieneRole('ADMIN_ROLE','USER_ROLE','VENTAS_ROLE'),
  check('id','No es un ID válido').isMongoId(),
  check('id').custom(existeCategoria),
  check('nombre','El nombre es obligatorio').notEmpty(),
  validarCampos
],actualizarCategoria)

//Borrar  una categoría por id  - privado -ADMIN_ROLE
  router.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
  ],delCategoria)

  module.exports = router;