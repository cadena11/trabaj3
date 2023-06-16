const {Router}=require('express')
const{createTipoEquipo,getTipoEquipos,EditarTipoEquipo, deleteTipoEquipo}=require('../controllers/TipoEquipo.controllers')
const{validarRolAdmin}=require('../middleware/validar-rol-admin');
const { validarJWT } = require('../middleware/validar.jwt');
const{validarRolDocente}=require('../middleware/validar-rol-docente')




const router= Router()

// crear
router.post('/',validarJWT, validarRolAdmin, createTipoEquipo);

//consultar
router.get('/',validarJWT,validarRolAdmin,validarRolDocente, getTipoEquipos)

//Actualizar

router.put('/:id',validarJWT,validarRolAdmin, EditarTipoEquipo)

//eliminar
router.delete('/:id', validarJWT,validarRolAdmin,deleteTipoEquipo)

module.exports= router;