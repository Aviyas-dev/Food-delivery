import { model, Schema } from 'mongoose';


const FOOD_CATEGORY_SCHEMA = new Schema(
  {
    categoryName: { type: String, required: true },
  },
  { timestamps: true }
);

const FoodCategoryModel = model('FoodCategory', FOOD_CATEGORY_SCHEMA, 'food-category');




export { FoodCategoryModel };
