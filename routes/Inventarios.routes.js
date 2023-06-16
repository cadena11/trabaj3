const { Router } = require('express')
const { createInventario, getInventarios,EditarInventario, deleteInventario} =
 require('../controllers/Inventarios.controllers')
const { validarJWT } = require('../middleware/validar.jwt');
const{validarRolAdmin}=require('../middleware/validar-rol-admin');
const{validarRolDocente}=require('../middleware/validar-rol-docente')




const router = Router()

// crear
router.post('/',validarJWT,validarRolAdmin, createInventario)

// consultar todos
router.get('/',validarJWT,validarRolAdmin,validarRolDocente, getInventarios)

router.put('/:id',validarJWT,validarRolAdmin, EditarInventario)

router.delete('/:id',validarJWT,validarRolAdmin, deleteInventario)

module.exports = router;