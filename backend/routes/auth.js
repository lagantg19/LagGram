const express=require('express')
const router=express.Router()
const {loginUser,signupUser}=require('../controllers/auth')

//login
router.post('/login',loginUser)

//signup
router.post('/signup',signupUser)




module.exports=router