const { Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const router = Router();
const { cargarArchivo } = require('../controllers/upload');

router.post('/',cargarArchivo);



module.exports = router;