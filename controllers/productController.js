export const getProducts = (req, res) => {
    return res.status(200).json({
        message: 'getAllProducts'
    });
}

export const addProducts = (req, res) => {
    try {
        return res.status(200).json({
            message: 'Product Added Successfully'
        });
    } catch (err) {
        return res.status(400).json({
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