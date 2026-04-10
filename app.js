import ejs from 'ejs';
import express from 'express';
import productData from './controllers/productController.js';
import routes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userModel from './models/userModels.js';
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/products',productData);
app.use('/',routes)
app.use('/',authRoutes);
app.get('/create-test-user',(req,res)=>{
    userModel.add('Kashish','narang2305@gmail.com','123456');
    res.send('Test user created in memory');
});

export default app;