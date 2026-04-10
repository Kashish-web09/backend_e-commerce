import express from 'express';
import userController from '../controllers/userController.js';
const authroutes=express.Router();

const usersController=new userController();
authroutes.post('/forgotPass',usersController.postForgotPassword);
authroutes.get('/forgotPass',usersController.getForgotPassword)
authroutes.get('/reset-password',usersController.getResetPassword);
authroutes.post('/reset-password',usersController.postResetPassword)

export default authroutes;