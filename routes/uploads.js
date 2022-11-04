const { Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const router = Router();
const { cargarArchivo, imageUpdate } = require('../controllers/upload');
const {colletionEnabled}= require('../helpers/dbValidators');

router.post('/',cargarArchivo);
router.put('/:collection/:id',[
    check('id','El id debe ser mondodb').isMongoId(),
    check('collection').custom( c => colletionEnabled(c,['usuarios','productos'])),
    validarCampos
], imageUpdate);



module.exports = router;