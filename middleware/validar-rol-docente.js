const jwt=require=('jsonwebtoken');

const validarRolDocente=(req,res,next)=>{
    if(req.payload.rol ==='DOCENTE'){
        return res.status(401).json({mensaje:'Error Unauthorized'});
    }
    next();
}
module.exports={
    validarRolDocente
}