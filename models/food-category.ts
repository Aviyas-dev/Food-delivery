import { model, Schema } from 'mongoose';

const FOOD_CATEGORY_SCHEMA = new Schema({
    categoryName: String,
 },
{ timestamps: true}
);

const FoodCategoryModel = model(
    'FoodCategory',
    FOOD_CATEGORY_SCHEMA,
    'food-category'
);
const FOOD_SCHEMA = new Schema({
    foodName: String,
    price: Number,
    image: String,
    ingredients: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: FoodCategoryModel
    }
},
{ timestamps: true})

const FoodModel = model(
    'Food',
    FOOD_SCHEMA,
    'foods'
)

export { FoodCategoryModel };
export { FoodModel };