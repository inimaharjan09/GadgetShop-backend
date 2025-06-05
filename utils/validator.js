import Joi from "joi";
import { categories } from "../models/Product.js";

// const fileSchema = Joi.object({
//     originalname: Joi.string().required(),
//     mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif').required(),
//     size: Joi.number().max(5 * 1024 * 1024).required(),
// }); 

export const productValSchema = Joi.object({
    name: Joi.string().min(0).required(),
    price: Joi.number().required(),
    description: Joi.string().min(0).required(),
    category: Joi.string().valid(...categories).required(),
    stock: Joi.number().min(0).required(),
    // image:fileSchema.required(),
    rating: Joi.number().default(0)
});