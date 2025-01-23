import { Request, Response, Router } from "express";
import { FoodModel } from "../models/food-category";
import cors from "cors";

export const foodRouter = Router();

// CORS middleware ашиглах
foodRouter.use(cors());

// Food-ийн үндсэн маршрут
foodRouter.get("/", async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const foods = await FoodModel.find(filter);
    res.json({ data: foods });
;
  } catch (error) {
    console.error("Error fetching foods:", error);
    res.status(500).json({ message: "Failed to fetch foods" });
  }
});

// Тодорхой foodId-тай хоолны мэдээллийг авах
foodRouter.get("/:foodId", async (req, res) => {
  try {
    const { foodId } = req.params;
    const food = await FoodModel.findById(foodId);
    if (!food) {
       res.status(404).json({ message: "Food item not found" });
    }
    res.status(200).json(food);
  } catch (error) {
    console.error("Error fetching food item:", error);
    res.status(500).json({ message: "Failed to fetch food item" });
  }
});

// Хоолны мэдээллийг шинэчлэх
foodRouter.patch("/:foodId", async (req, res) => {
  try {
    const { foodId } = req.params;
    const updateData = req.body;
    const updatedFood = await FoodModel.findByIdAndUpdate(foodId, updateData, { new: true });
    if (!updatedFood) {
       res.status(404).json({ message: "Food item not found" });
    }
    res.status(200).json(updatedFood);
  } catch (error) {
    console.error("Error updating food item:", error);
    res.status(500).json({ message: "Failed to update food item" });
  }
});

// Хоол устгах
foodRouter.delete("/:foodid", async (req: Request, res: Response) => {
  try {
    const { foodid } = req.params;
    const deletedItem = await FoodModel.findByIdAndDelete(foodid);
    if (!deletedItem) {
       res.status(404).json({ message: "Food item not found" });
    }
    res.status(200).json(deletedItem);
  } catch (error) {
    console.error("Error deleting food item:", error);
    res.status(500).json({ message: "Failed to delete food item" });
  }
});

// Хоол нэмэх
foodRouter.post("/", async (req, res) => {
  const { title, description, price, category, image } = req.body;

  if (!title || !description || !price || !category) {
    res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newFood = new FoodModel({ title, description, price, category, image });
    await newFood.save();
    res.status(201).json(newFood);
  } catch (error) {
    console.error("Error saving food:", error);
    res.status(500).json({ message: "Failed to save food" });
  }
});


