import Product from "../models/Product.js";

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
    excludeFields.forEach(label => delete queryObject[label])

        console.log(req.query);
        //console.log(req.query.replace(/\b(gte|gt|lte|lt|eq)\b/g, match => `$${match}`));

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
        return res.status(500).json({
            message: `${err}`
        });
        
    }
}

export const addProducts = async (req, res) => {
    //console.log(req.body);
const { name, price, description, category, stock, image } = req.body;
    try {
        await Product.create({ name, price, description, category, stock, image
        })
        return res.status(200).json({
            message: 'Product Added Successfully'
        });
    } catch (err) {
        return res.status(500).json({
            message: `${err}`
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

export const removeProduct = (req, res) => {
    return res.status(200).json({
        message: 'removeProduct'
    });
}
