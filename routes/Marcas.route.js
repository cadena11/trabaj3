const {Router}=require('express')
const{createMarcas,getMarcas, EditarMarca, deleteMarcas}=require('../controllers/Marcas.controllers');
const { validarJWT } = require('../middleware/validar.jwt');
const{validarRolAdmin}=require('../middleware/validar-rol-admin');
const{validarRolDocente}=require('../middleware/validar-rol-docente')





const router= Router()

// crear
router.post('/',validarJWT,validarRolAdmin, createMarcas)

//consultar
router.get('/',validarJWT,validarRolAdmin,validarRolDocente, getMarcas)

//Actualizar
router.put('/:id',validarJWT,validarRolAdmin, EditarMarca)

//Eliminar
router.delete('/:id',validarJWT,validarRolAdmin, deleteMarcas)

module.exports= router;