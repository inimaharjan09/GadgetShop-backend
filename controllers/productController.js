export const getProducts = (req, res) => {
    return res.status(200).json({
        message: 'getAllProducts'
    });
}

export const addProducts = (req, res) => {
    return res.status(200).json({
        message: 'addProducts'
    });
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