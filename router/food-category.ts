import { Request, Response, Router } from "express";
import { FoodCategoryModel } from "../models/food-category";
import cors from "cors";

export const foodCategoryRouter = Router();
foodCategoryRouter.use(cors());
foodCategoryRouter.get('/', async (req, res)=> {
    const items = await FoodCategoryModel.find();
    res.json(items); 
});

//create new food category-shiniig uusgeh
foodCategoryRouter.post('/', 
    async (req: Request, res: Response) => {
    const newItem = await FoodCategoryModel.create({
        categoryName : req.body.categoryName,
    });

    res.json({
        message: 'New Food Category created successfully.',
        newItem,
    });
});

foodCategoryRouter.get('/:id', async (req: Request, res: Response)=> {
    const id = req.params.id;
    const item = await FoodCategoryModel.findById(id);
    res.json(item)
    
});

//update hiih heseg
foodCategoryRouter.put('/:_id', async (req: Request, res: Response) => {
    const { _id } = req.params;
    const  updatedItem  = await FoodCategoryModel.findByIdAndUpdate(
        _id,
        { categoryName : req.body.categoryName },
        { new: true }
    ); 
     res.json(updatedItem);
    });
  
      //Delete-ustgah
 foodCategoryRouter.delete('/:_id', async (req: Request, res: Response) => {
    const { _id } = req.params;
    const deletedItem = await FoodCategoryModel.findByIdAndDelete(_id);
    res.json(deletedItem);

});



