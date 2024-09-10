const ensureAuthenticated = require('../middlewares/Auth');

const router=require('express').Router()

router.get('/',ensureAuthenticated,(req,res)=>{
    res.status(200)
    .json([
        {
            name:'mobile',
            price:'100'
        },
        {
            name:'medal',
            price:'0'
        }
    ])
})
module.exports=router;