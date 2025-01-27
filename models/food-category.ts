import { model, Schema } from 'mongoose';

// Хоолны категори загвар
const FOOD_CATEGORY_SCHEMA = new Schema(
  {
    categoryName: { type: String, required: true },
  },
  { timestamps: true }
);

const FoodCategoryModel = model('FoodCategory', FOOD_CATEGORY_SCHEMA, 'food-category');

// Хоолны мэдээллийн загвар


export { FoodCategoryModel };
