const router=require('express').Router()

const cApi=require('../controllers/controller')

router.get('/',cApi.login)

module.exports=router