import userModel from "../models/userModels.js";
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export default class userController{
getRegister(req,res){
    res.render('register');
}
postregister(req,res){
    const {fullname,email,password}=req.body;
    userModel.add(fullname,email,password);
    res.render('login')
}
getLogin(req,res){
    res.render('login')
}
postLogin(req,res){
    console.log('Login form submit',req.body);
    const {email,password}=req.body;
    const user=userModel.isValidUser(email,password);
    console.log("Match user",user)
    if(user){
        res.redirect('/');
    }else{
        res.status(400).send("Invalid credentials")
    }
}
getForgotPassword(req,res){
    res.render('forgotPass')
}
postForgotPassword(req,res){
    const {email} = req.body;
    console.log("POST /forgotPass hit with email:", email); // ✅ debug log

    const user = userModel.findByEmail(email);

    if(user){
        const token = crypto.randomBytes(32).toString('hex');
        user.resetToken = token;
        user.tokenExpiry = Date.now() + 3600000; // ✅ fix spelling

        const resetLink = `http://localhost:4090/reset-password?token=${token}`;
        console.log("Reset Link:", resetLink); // ✅ this should appear
        const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'knarang0909@gmail.com',
        pass:'enynneafbzlycecq'

    }
})

        const mailOption={
            from:'knarang0909@gmail.com',
            to:user.email,
            subject:'Password Reset Link',
            html:`
            <p>Hello ${user.fullname}</p>
            <p>You requestd a password reset. Click the link below to reset your password.</p>
            <a href="${resetLink}">${resetLink}</a>
                    <p>This link will expire in 1 hour.</p>
            `
        };
        transporter.sendMail(mailOption,(error,info)=>{
            if(error){
                console.log("Error sent:",error)
            }else{
                console.log("EMail sent: ",info.response)
            }
        })
        
    } else {
        console.log("Email not found in users array");
    }

    res.send('If this email exists, a reset link has been sent');
}
getResetPassword(req,res){
const token=req.query.token;
const user=userModel.findByToken(token);
if(!user || user.tokenExpiry<Date.now()){
return res.send("Invalid or expired link")
}
res.render('reset-password',{token})

}
postResetPassword(req,res){
    const {token,password,confirmPassword}=req.body;
if(password!==confirmPassword){
    return res.send("Password do not match")
}
const user=userModel.findByToken(token);
if(!user || user.token<Date.now()){
    return res.send("Invalid or expired token")
}
user.password=password;
user.resetToken=null;
user.tokenExpiry=null;
res.send("Password successfully updated. You can now login")
}

}