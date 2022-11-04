const { Router} = require('express');
const { check } = require('express-validator');
const { crearProducto,listarProducto,listarProductoId, actualizarProducto, delProducto } = require('../controllers/productos');
const { existeCategoria, existeCategoriaValida, existeProducto } = require('../helpers/dbValidators');

const {
    validarCampos,
    validarJWT,
    validarRol,
    tieneRole
  } = require('../middlewares');
  const router = new Router();


    // Obtener todas los productos  - público
    router.get('/',listarProducto);


   // Obtener productos por ID  - público
   router.get('/:id',[
    check('id','No es un ID válido').isMongoId(),
    validarCampos
   ],listarProductoId); 


  //Crear producto - privado - cualquier usuario -USER_ROLE
  router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('categoria','La categoria es obligatorio').notEmpty(),
    check('categoria').custom(existeCategoria),
    check('categoria').custom(existeCategoriaValida),
    validarCampos
    ],crearProducto);

//Actualizar  un producto por id  - privado -USER_ROLE
router.put('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE','USER_ROLE','VENTAS_ROLE'),
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeProducto),
    check('nombre','El nombre es obligatorio').notEmpty(),
    validarCampos
  ],actualizarProducto)

//Borrar  una categoría por id  - privado -ADMIN_ROLE
router.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
  ],delProducto)



module.exports = router;