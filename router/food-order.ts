import { Request, Response, Router } from "express";
import { FoodOrderModel } from "../models/food-order";

export const foodOrderRouter = Router();

foodOrderRouter.get("/", async (req: Request, res: Response) => {
  try {
    const foodOrders = await FoodOrderModel.find();
    res.json(foodOrders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


foodOrderRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await FoodOrderModel.findOne({ _id: id });

    if (!item) {
       res.status(404).json({ message: "Order not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


foodOrderRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { body } = req;
    await FoodOrderModel.create(body);
    const foodOrders = await FoodOrderModel.find();
    res.json(foodOrders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


foodOrderRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { deliveryState } = req.body;

    const updatedOrder = await FoodOrderModel.findByIdAndUpdate(
      id,
      { deliveryState },
      { new: true }
    );

    if (!updatedOrder) {
      res.status(404).json({ message: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


foodOrderRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedOrder = await FoodOrderModel.findByIdAndDelete(id);

    if (!deletedOrder) {
      res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Deleted successfully", deletedOrder });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


