const {Router}=require('express')
const{createUsuario,getUsuario, EditarUsuario, deleteUsuario}=require('../controllers/Usuario.controller')
const { validarJWT } = require('../middleware/validar.jwt');
const{validarRolAdmin}=require('../middleware/validar-rol-admin');
const{validarRolDocente}=require('../middleware/validar-rol-docente')




const router= Router()

// crear
router.post('/', createUsuario);

//consultar
router.get('/', validarJWT,validarRolAdmin,validarRolDocente, getUsuario);

//actualizar

router.put('/:id',validarJWT,validarRolAdmin, EditarUsuario);
//Eliminar
router.delete('/:id',validarJWT,validarRolAdmin, deleteUsuario);




module.exports= router;