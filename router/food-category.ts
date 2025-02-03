import { Request, Response, Router } from "express";
import { FoodCategoryModel } from "../models/food-category";
import cors from "cors";

export const foodCategoryRouter = Router();
foodCategoryRouter.use(cors());


foodCategoryRouter.get('/', async (req: Request, res: Response)=> {
    const foodCategories = await FoodCategoryModel.find();
    res.json(foodCategories);
});

foodCategoryRouter.get('/:id', async (req: Request, res: Response)=> {
    const id = req.params;
    const item = await FoodCategoryModel.find({_id: id});
    res.json(item)
    
});


foodCategoryRouter.post('/', async (req: Request, res: Response) => {
    const {body} = req;
    await FoodCategoryModel.create({
        ...body,});
        const foodCategories = await FoodCategoryModel.find();

    res.json(foodCategories);
});




foodCategoryRouter.put('/:_id', async (req: Request, res: Response) => {
    const { params, body } = req;
    const foodCategoryId = params._id;
    const item = await FoodCategoryModel.find({_id: foodCategoryId});
    const  updatedItem  = await FoodCategoryModel.findByIdAndUpdate(
        foodCategoryId,
        { ...item, ...body },
        { new: true }
    ); 
     res.json(updatedItem);
    });
  
      
 foodCategoryRouter.delete('/:id', 
    async (req: Request<{ id: string }>, res: Response) => {
    const foodCategoryId = req.params.id;
    const deletedCategory = await FoodCategoryModel.findByIdAndDelete(foodCategoryId);
    res.json("Deleted: " + deletedCategory);

});



