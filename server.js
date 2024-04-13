const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {sendOTP}=require('./nodemailer');
const password=require('./password');

const app = express();
app.use(express.static('public'));
app.use(cors());
app.use(express.json());
let otp,userMail; 
app.post('/login',async (req,res) => {
    const user=req.body.email;
    otp = Math.floor(1000 + Math.random() * 9000).toString();
    userMail=user;
    await sendOTP(user,otp);
    res.send("Otp sent");
})
app.post('/verification',async (req,res) =>{
    const userOtp=req.body.otp;
    if(userOtp==otp){
        res.send("login successful");
    }else{
        res.status(400).send("wrong otp");
    }
})
app.post('/add',async (req,res) => {
    const data=req.body;
    const pass=new password();
    pass.website=data.website;
    pass.password=data.password;
    pass.email=userMail;
    try {
        await pass.save();
        res.send("Password saved successful"); 
    } catch(err) {
        res.status(404).send("Couldn't save password");
    }
})
app.get('/passwords',async (req,res) => {
    try {
        const web = await password.find({ email: userMail });
    
        if (!web) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.send(web);
        
      } catch (error) {
        console.error('Error fetching passwords:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
})

mongoose.connect('mongodb://127.0.0.1:27017/afs_st1');

app.listen(3000, () => {
    console.log("http://localhost:3000");
});