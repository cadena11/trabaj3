const Usuario=require('../models/Users')
const {request,response}=require('express')
const {validationResult, check}=require('express-validator');
const Users = require('../models/Users');
const bycript=require('bcryptjs');
const {generarJwt}=require('../helpers/jwt');

const createLogin= async(req=request,
    res=response)=>{

        check('email', 'invalid.email').isEmail(),
        check('password', 'invalid.password').not().isEmpty()
        
        try {
            const errors=validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({mensaje:errors.array()})
            }
           // const nombre=req.body.nombre ? req.body.nombre.toUpperCase():''
            const email=req.body.email? req.body.email.toUpperCase():''
            const salt=bycript.genSaltSync()
            const password=bycript.hashSync( req.body.password,salt)
            //password=password;

          // const rol=req.body.rol? req.body.rol.toUpperCase():''

    const usuario= await Usuario.findOne({email})
    if(!usuario){
        return res.status(400).json({msg:'Ya existe'})
    }

    const esIgual=bycript.compareSync(req.body.password, usuario.password)
    if(!esIgual){
        return res.status(400).send({mensaje: 'ya existe'})
    }

    const token=generarJwt(usuario);

   // res.json({_id:usuarios._id, nombre: usuarios.nombre, rol: usuarios.rol,
   // email: usuarios.email})

   /* let usuary=new Users();
    usuary.nombre=req.body.nombre;
    usuary.email=req.body.email;
    usuary.rol=req.body.rol;
    usuary.password=req.body.nombre;*/

    const UsuarioResponse={
        _id:usuario.id,
        nombre:usuario.nombre,
        rol:usuario.rol,
        email:usuario.email,
        acces_token:token
    }
    return res.status(201).json(UsuarioResponse)
            
        } catch (error) {
            return res.status(500).json({
                msg:'Error general'+ e
            })
        }
}

module.exports={
    createLogin
}