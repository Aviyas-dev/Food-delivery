import { configDotenv } from 'dotenv';
import express from 'express';
import { foodCategoryRouter } from './router/food-category';
import { foodRouter } from './router/food';

const mongoose = require('mongoose');
const cors = require('cors');

const PORT = 8000;
const app = express();
app.use(cors());
app.use(express.json());

configDotenv();

const URI =
process.env.MONGODB_URI;
console.log(URI)
let client = null;
 
export const connectMongoDB = async ()=>{
 const MONGODB_URI = process.env.MONGODB_URI; 
 await mongoose.connect(MONGODB_URI)
 };
 connectMongoDB();

 app.use('/food-category', foodCategoryRouter);
 //end uur router bn
 app.use('/food', foodRouter);
//  app.use('/order/', foodCategoryRouter);
 
 
 app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})