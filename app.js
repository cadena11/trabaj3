const express=require('express')
const app =express();
const cors= require('cors')

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors({
    origin:'*'
}))
const tipoEquipo=require('./routes/TipoEquipo.route')
const estadoEquipo=require('./routes/EstadoEquipo.route')
const usuario=require('./routes/Usuario.route')
const marcas=require('./routes/Marcas.route')
const inventarios=require('./routes/Inventarios.routes')
const login=require('./routes/login')
app.use('/api/tiposequipos',tipoEquipo)
app.use('/api/estadosequipos',estadoEquipo)
app.use('/api/usuarios',usuario)
app.use('/api/marcas',marcas)
app.use('/api/inventarios',inventarios)
app.use('/api/logins',login)


module.exports=app