import express from 'express';
import userController from '../controllers/userController.js';
const routes=express.Router();

const usersController=new userController();
routes.get('/register',usersController.getRegister);
routes.post('/register',usersController.postregister);
routes.get('/login',usersController.getLogin);
routes.post('/login',usersController.postLogin);
export default routes;