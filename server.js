const express = require('express')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const app = express()


const port = process.env.PORT

app.use(express.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://server-personal-use.herokuapp.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/contact', async (req, res) => {
  try{
    console.log(req.body)
    const msg = {
      to: 'milos.mladenovic.work@gmail.com',
      from: req.body.email,
      subject: 'From ' + req.body.name,
      text:req.body.message
    }
    await sgMail.send(msg);
    res.status(200).json({message:'Hi there, ' + req.body.name + '. I am going to respond to your message as soon as I can. Regards, Milos Mladenovic.'})  
  }catch(e){
    res.status(500).json({"error":'There was an error sending your mail'})
  }
})

app.listen(port, () => {
  console.log('Listening on port ' + port)
})