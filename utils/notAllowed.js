export const notAllowed = (req, res) => {
    return res.status(405).json({
        message: 'Method Not Allowed'
    });
}