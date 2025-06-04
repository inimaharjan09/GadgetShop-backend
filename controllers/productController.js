import Product from "../models/Product.js";
import fs from 'fs';

export const getTop5 = (req, res, next) => {
    req.query.rating = { $gt: 4.5 };
    req.query.limit = 5;
    req.query.sort = '-rating';
    next();
}

export const getProducts = async(req, res) => {
    try {
    const queryObject = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields', 'skip'];
    excludeFields.forEach(label => delete queryObject[label]);

    //  if (req.query.inStock === 'true') {
    //         queryObject.stock = { $gt: 0 };
    //     }

        //console.log(req.query);
        // let queryStr = JSON.stringify(queryObject);
        // queryStr = queryStr.replace(/\b(gt|gte|lt|lte|eq|ne)\b/g, match => `$${match}`);
        // const finalQuery = JSON.parse(queryStr);

        let query = Product.find(queryObject);

        if (req.query.search){
            const searchText = req.query.search.toLowerCase();
            if(categories.includes(searchText)){
                queryObject.category = { $regex : searchText, $options: 'i' };

            }else {
                    queryObject.name = { $regex : searchText, $options: 'i' };
                }
        }

        if(req.query.sort) {
            const sorting = req.query.sort.split(/[\s,]+/).filter(Boolean).join(' ');
            query.sort(sorting);
        }

        if(req.query.fields) {
            const selects = req.query.fields.split(/[s,]+/).filter(Boolean).join(' ');
            query.select(selects);
     }

        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * 10;
        
        const products = await query.skip(skip).limit(limit);

        return res.status(200).json(products);
    } catch (err) {
        return res.status(400).json({
            message: `${err}`
        });
        
    }
}

export const addProducts = async (req, res) => {
    //console.log(req.body);
const { name, price, description, category, stock } = req.body;
    try {
        
        await Product.create({ name,
            price,
            description,
            category,
            stock, 
            image: req.image
        })
        return res.status(200).json({
            message: 'Product Added Successfully'
        });
    } catch (err) {
        fs.unlink(`./uploads/${req.image}`, (imageErr) => {
            return res.status(400).json({
            message: `${err}`
        });
        });
    }
}

export const getProduct = (req, res) => {
    return res.status(200).json({
        message: 'getProduct'
    });
}

export const updateProduct = (req, res) => {
    return res.status(200).json({
        message: 'updateProduct'
    });
}

export const removeProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const isExist = await Product.findById(id);
        if (!isExist) {
            return res.status(400).json({ message: 'Product Not Found' });
        }

        fs.unlink(`./uploads/${isExist.image}`, async (imageErr) => {
            if (imageErr) {
                return res.status(400).json({ message: `${imageErr}` });
            }

            await Product.findByIdAndDelete(id);
            return res.status(200).json({ message: 'Product Removed Successfully' });
        });
    } catch (err) {
        return res.status(400).json({ message: `${err}` });
    }
};
