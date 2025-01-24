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
const FOOD_SCHEMA = new Schema(
  {
    foodName: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    ingredients: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'FoodCategory', required: true },
  },
  { timestamps: true }
);

const FoodModel = model('Food', FOOD_SCHEMA, 'foods');

export { FoodCategoryModel, FoodModel };
