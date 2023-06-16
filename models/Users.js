const{Schema,model}=require('mongoose')

const UsuarioSchema=Schema({
    nombre:{
        type:String,
        required:true
    },
    
    email:{
        type:String,
        required:true
    },

    password:{
        type:String, 
        required:true
    },

    rol:{
        type:String,
        required:true,
        enum:['ADMIN', 'DOCENTE']
    },
    
    fechaCreacion:{
        type:Date,
        default:new Date()
    },
    fechaActualizacion:{
        type:Date,
        default:new Date()
    }
})

module.exports=model('Usuario',UsuarioSchema)