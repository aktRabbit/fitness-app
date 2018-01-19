const express=require('express');
const path = require('path')
const bodyparser=require('body-parser');
const router=require('./route/index-route');
const hbs=require('hbs');
const app=express();
const nodemailer = require('nodemailer');
const mail=require('./config/keys');

var port=process.env.PORT||3000;
app.set('views', path.join(__dirname, 'views'))

app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(router);


app.get('/',(req,res)=>{
  res.render('index');
});

app.post('/submit',(req,res)=>{


  var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.ethereal.email',
  port: 3000,
  secure: false,

  auth: {
    user: mail.mail.mailID,
    pass: mail.mail.mailpassword
  }
});

var textMessage="from mail "+req.body.mail+" from name "+req.body.name+" "+req.body.message;

var mailOptions = {
  from: mail.mail.mailID,
  to: mail.mail.serverID,
  subject: req.body.subject,
  text: textMessage
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    res.redirect('/');
  }
});


})
app.listen(port,process.env.IP,()=>{
  console.log(`Starting at port ${port}`);
});
