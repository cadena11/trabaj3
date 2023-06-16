const {Router}=require('express')
const{createEstadoEquipo,getEstadoEquipos, EditarEstadoEquipo, deleteEstado}=require('../controllers/EstadoEquipo.controllers')
const { validarJWT } = require('../middleware/validar.jwt');
const{validarRolAdmin}=require('../middleware/validar-rol-admin');
const{validarRolDocente}=require('../middleware/validar-rol-docente')




const router= Router()

// crear
router.post('/',validarJWT,validarRolAdmin, createEstadoEquipo)
 
//consultar
router.get('/',validarJWT,validarRolAdmin,validarRolDocente, getEstadoEquipos)

router.put('/:id',validarJWT,validarRolAdmin, EditarEstadoEquipo)

router.delete('/:id',validarJWT,validarRolAdmin, deleteEstado)

module.exports= router;