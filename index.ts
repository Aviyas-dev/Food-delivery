import { configDotenv } from 'dotenv';
import express from 'express';
import { foodCategoryRouter } from './router/food-category';
import { foodRouter } from './router/food';
import { userRouter } from './router/user';
import { foodOrderRouter } from './router/food-order'; 

const mongoose = require('mongoose');
const cors = require('cors');

const PORT = 8000;
const app = express();
app.use(cors());
app.use(express.json());

configDotenv();

export const connectMongoDB = async () => {
 const MONGODB_URI: any = process.env.MONGODB_URI; 
 await mongoose.connect(MONGODB_URI)
 };
 connectMongoDB();

 app.use('/food-category', foodCategoryRouter);
 app.use('/user', userRouter);
 app.use('/food', foodRouter);
 app.use('/food-order', foodOrderRouter);

 
 
 app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});