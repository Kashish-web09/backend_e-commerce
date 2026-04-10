import express from 'express';
import productData from '../controllers/productController.js';
const routes=express.Router();

routes.get('/products',productData)