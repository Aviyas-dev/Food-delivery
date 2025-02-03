import { Request, Response, Router } from "express";
import { FoodModel } from "../models/food";
import cors from "cors";

export const foodRouter = Router();


foodRouter.use(cors());


foodRouter.get("/", async (req: Request, res: Response) => {
 const filter = req.query.category ? { category: req.query.category } : {};
 const foods = await FoodModel.find(filter);
    res.json(foods);
});


foodRouter.get("/:foodId", async (req: Request, res: Response) => {
    const id = req.params;
    const item = await FoodModel.find({ _id: id });
    res.json(item);
 
});


foodRouter.put("/:id", async (req: Request, res: Response) => {
    const { params, body } = req;
    const foodId = params.id;
    const item = await FoodModel.find({ _id: foodId });
    const updatedItem = await FoodModel.findByIdAndUpdate(
        foodId,
        { ...item, ...body },
        { new: true }
    );
    res.json(updatedItem);
  
});


foodRouter.delete("/:id", async (req: Request<{ id: string}>, res: Response) => {
    const foodId = req.params.id;
    const deletedFood = await FoodModel.findByIdAndDelete(foodId);
    res.json("Deleted: " + deletedFood);
 
});


foodRouter.post("/", async (req: Request, res: Response) => {
  const { body } = req;
    await FoodModel.create({
        ...body,
    });
    const food = await FoodModel.find();
    res.json(food);


});


