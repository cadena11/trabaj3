const Usuario=require('../models/Users')
const {request,response}=require('express')
const {validationResult, check}=require('express-validator');
const Users = require('../models/Users');
const bycript=require('bcryptjs');
const{validarJWT}=require('../middleware/validar.jwt');
const{validarRolAdmin}=require('../middleware/validar-rol-admin')

//crear
const createUsuario= async(req=request,
    res=response)=>{

        check('nombre', 'invalid.nombre').not().isEmpty(),
        check('email', 'invalid.email').isEmail(),
        check('password', 'invalid.password').not().isEmpty(),
        check('rol', 'invalid.rol').isIn(['ADMIN', 'OBSERVADOR']),
        validarJWT
        

        
        try {
            const errors=validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({mensaje:errors.array()})
            }
            const nombre=req.body.nombre ? req.body.nombre.toUpperCase():''
            const email=req.body.email? req.body.email.toUpperCase():''
            const salt=bycript.genSaltSync()
            const password=bycript.hashSync( req.body.password,salt)
            //password=password;

            const rol=req.body.rol? req.body.rol.toUpperCase():''

    const usuarioDB= await Usuario.findOne({nombre,email,password,rol})
    if(usuarioDB){
        return res.status(400).json({msg:'Ya existe'})
    }

   /* let usuary=new Users();
    usuary.nombre=req.body.nombre;
    usuary.email=req.body.email;
    usuary.rol=req.body.rol;
    usuary.password=req.body.nombre;*/



    const daty={
        nombre,email,password,rol
    }

    const usuario=new Usuario(daty)
    console.log(usuario)
    await usuario.save()
    return res.status(201).json(usuario)
            
        } catch (error) {
            return res.status(500).json({
                msg:'Error general'+ e
            })
        }
    

}

//listar todos
const getUsuario=async(req=request,
   
        res=response)=>{
            
            try {
                const {estad}=req.query
        const usuarioDB= await Usuario.find({estad})
        
        return res.json(usuarioDB)
                
            } catch (error) {
                return res.status(500).json({
                    msg:'Error general'+ e
                })
            }
        }

 // Actualizar Usuario
 const EditarUsuario = (req = request,
    res = response) => {


        const {id} = req.params


        const inf = req.body 
        const salt=bycript.genSaltSync();
        const hashedPassword=bycript.hashSync(inf.password,salt);                                             
        const newUsuarioInfor = {
            nombre: inf.nombre,
            email:inf.email,
            password:hashedPassword,
            rol: inf.rol,
            //fechaCreacion: inf.fechaCreacion,
            fechaActualizacion: inf.fechaActualizacion,
           
        }
        Usuario.findByIdAndUpdate(id,newUsuarioInfor, { new: true})
        .then(result => {
            res.json(result)
        }).catch(error => {
            console.error(error)
        })
}  

const deleteUsuario = (req = request,
    res = response, next) => {
   
        const {id} = req.params

Usuario.findByIdAndDelete(id).then(resultado => {
    res.json(resultado)
    
}).catch(error => next(error))
}



module.exports={createUsuario,getUsuario,EditarUsuario,deleteUsuario}
