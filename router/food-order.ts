import {Request, Response, Router} from 'express';
import { FoodOrderModel } from '../models/food-order';

export const foodOrderRouter = Router();

foodOrderRouter.get('/', async (req: Request, res: Response) => {
    const foodOrder = await FoodOrderModel.find();
    res.json(foodOrder);
});

foodOrderRouter.get('/:id', async (req: Request, res: Response) => {
    const id = req.params;
    const item = await FoodOrderModel.find({_id: id});
    res.json(item);
});

foodOrderRouter.post('/', async (req: Request, res: Response) => {
    const {body} = req;
    await FoodOrderModel.create({
        ...body,
    });
    const foodOrder = await FoodOrderModel.find();

    res.json(foodOrder);
});

foodOrderRouter.put('/:_id', async (req: Request, res: Response) => {
    const { params, body } = req;
    const foodOrderId = params._id;
    const item = await FoodOrderModel.find({_id: foodOrderId});
    const updatedItem = await FoodOrderModel.findByIdAndUpdate(
        foodOrderId,
        { ...item, ...body },
        { new: true }
    );
    res.json(updatedItem);
});

foodOrderRouter.delete('/:_id',
    async (req: Request<{ id: string }>, res: Response) => {
        const foodOrderId = req.params.id;
        const deletedFoodOrder = await FoodOrderModel.findByIdAndDelete(foodOrderId);
        res.json("Deleted: " + deletedFoodOrder);

    });

