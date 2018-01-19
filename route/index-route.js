const router = require('express').Router();

router.get('/profile',(req,res)=>{
  res.send("Hi there");
});

module.exports=router;
