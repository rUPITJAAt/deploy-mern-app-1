const { login, signup } = require('../controllers/AuthController');
const { loginValidation, signUpValidation } = require('../middlewares/AuthVadidation');

const router=require('express').Router();
router.post('/login',loginValidation,login);
router.post('/signup',signUpValidation,signup);
module.exports=router;