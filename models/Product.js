import mongoose from "mongoose";

export const categories = [ "mobile", "camera", "laptop", "accessories" ];

const productSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: categories,
        required: true
    },
    stock: {
        type: Number,
    required: true,
    default: 0,
    min: 0
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
},
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
