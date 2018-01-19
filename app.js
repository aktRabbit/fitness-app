const express=require('express');
const path = require('path')
const router=require('./route/index-route');
const hbs=require('hbs');
const app=express();
var port=process.env.PORT||3000;
app.set('views', path.join(__dirname, 'views'))

app.set('view engine','ejs');

//app.use(express.static(__dirname+'/public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/profile',router);
app.get('/',(req,res)=>{
  res.render('index');
});
app.listen(port,process.env.IP,()=>{
  console.log(`Starting at port ${port}`);
});
