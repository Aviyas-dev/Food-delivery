import { Request, Response, Router } from "express";
import { FoodCategoryModel } from "../models/food-category";

export const foodCategoryRouter = Router();

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
foodCategoryRouter.put(':id', async (req: Request, res: Response) => {
    const  updatedItem  = await FoodCategoryModel.findByIdAndUpdate(
        req.params.id,
        {
         categoryName : req.body.categoryName
        },
        {
            new: true 
        }
    ); 
     
    res.json(updatedItem);
    });
  
      


//Update- shinechileh
// app.put('/food-category/:id', async (req: Request, res: Response) => {
//     res.json({
//         message: 'One Food Category updated successfully.',
//     });
// });



//Delete-ustgah
foodCategoryRouter.delete('/:_id', async (req: Request, res: Response) => {
    const deletedItem = await FoodCategoryModel.findByIdAndDelete(req.params);
    res.json(deletedItem);

});



