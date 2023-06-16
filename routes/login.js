const {Router}=require('express')
const{createLogin}=require('../controllers/login')



const router= Router()

// crear
router.post('/',createLogin);



module.exports= router;