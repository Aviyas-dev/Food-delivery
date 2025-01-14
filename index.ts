import { config, configDotenv } from 'dotenv';
import express, {Request, Response} from 'express';

const mongoose = require('mongoose');

const PORT = 8000;
const app = express();
app.use(express.json());

configDotenv();

const URI =
process.env.MONGODB_URI;
console.log(URI)
let client = null;
 
export const connectMongoDB = async ()=>{
 const MONGODB_URI = process.env.MONGODB_URI; 
 if (!MONGODB_URI){
    throw new Error(
        'Database Connection URI is not defined in enviroment variables.'
    );
 }
 try{
    
    await mongoose.connect(MONGODB_URI);
    console.log('Successfully connected to the MongoDB database.');
 }catch (connectionError){
    console.error(
        'Failed to connect to the MongoDB database:',
        connectionError
    );
 }
 };
 connectMongoDB();

 const FOOD_CATEGORY_SCHEMA = new mongoose.Schema({
    categoryName: String,
 },
{ timestamps: true}
);

const FoodCategoryModel = mongoose.model(
    'FoodCategory',
    FOOD_CATEGORY_SCHEMA,
    'food-category'
);








//Update- shinechileh
// app.put('/food-category/:id', async (req: Request, res: Response) => {
//     res.json({
//         message: 'One Food Category updated successfully.',
//     });
// });
//update hiih heseg
app.put('/food-category/:id', async (req: Request, res: Response) => {
    const  id  = req.params; // Хүсэлтээс ID-г авч байна
    const  categoryName  = req.body; // Хүсэлтээс шинэ нэрийг авч байна

    // Хэрвээ categoryName байхгүй бол алдаа илгээх
    if (!categoryName) {
       res.status(400).json({
            message: 'Category name is required.',
        });
    }

    try {
        // ID-тай хоолны ангиллыг шинэчлэх
        const updatedItem = await FoodCategoryModel.findByIdAndUpdate(
            id, // ID
            categoryName , // Шинэ нэр
            { new: true } // Шинэчилсэн баримтыг буцаах
        );

        // Хэрвээ хоолны ангилал олдсонгүй бол
        if (!updatedItem) {
            res.status(404).json({
                message: 'Food Category not found.',
            });
        }

        // Амжилттай шинэчлэгдсэн тохиолдолд
        res.status(200).json({
            message: 'One Food Category updated successfully.',
            updatedItem,
        });
    } catch (error) {
        // Алдаа гарсан тохиолдолд
        res.status(500).json({
            message: 'Error updating food category.',
            error,
        });
    }
});


//Delete-ustgah
app.delete('/food-category/:_id', async (req: Request, res: Response) => {
    const {id} = req.params;
    try{
        const deletedItem = await FoodCategoryModel.deleteOne(id);
        if(!deletedItem) {
           res.status(404).send({
           message: 'Food Category not found.',
        })
    }
    res.send({
                    message: `Food Category with ID: ${id} deleted successfully.`,
                    deletedItem,
                });
            } catch (error) {
                res.status(500).send({
                    message: 'Error deleting food category.',
                    error,
                });
            }
});


// barij avah
app.get('/food-category', async (req: Request, res: Response)=> {
    const id = await FoodCategoryModel.find();
    res.json(id);
});
app.get('/food-category/:id', async (req: Request, res: Response)=> {
    const id = await FoodCategoryModel.find();
    const item = await FoodCategoryModel.findById(id);
    res.json(item);
});

//create new food category-shiniig uusgeh
app.post('/food-category/', async (req: Request, res: Response) => {
    // Хүсэлтээр ирсэн өгөгдлийг авна
    app.use(express.json());
    const categoryName = req.body;
    console.log(categoryName)

    // Хэрвээ categoryName байхгүй бол алдаа илгээх
    // if (!categoryName) {
    //      res.status(400).send({
    //         message: 'Category name is required.',
    //     });
    // }

    // try {
        // Шинэ хоолны ангилал үүсгэх
        const newItem = await FoodCategoryModel.create(categoryName);

        // Амжилттай үүсгэсний дараа хариу илгээх
        res.status(201).send({
            message: 'New Food Category created successfully.',
            newItem,
        });
    // } catch (error) {
    //     // Алдаа гарах тохиолдолд
    //     res.status(500).send({
    //         message: 'Error creating new food category.',
    //         error,
    //     });
    // }
});


app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})