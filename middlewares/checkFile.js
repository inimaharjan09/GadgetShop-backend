import { v4 as uuidv4 } from "uuid";

const supportedTypes = [ 'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif' ];

export const fileCheck = (req, res, next) => {
    const file = req.files?.image;
    if(file){
        if(supportedTypes.includes(file.mimetype)){
            const imageFile= `/${uuidv4()}-${file.name}`
            file.mv(`./uploads/${imageFile}`, (err) => {
                if(err) return res.status(400).json({
                    message: `${err}`
                });
                req.image = imageFile;
            next();
            });
        }else{
            return res.status(400).json({
                message: 'Please provide valid file'
            });
        }
    }else{
        return res.status(400).json({
            message: 'Please provide image file'
        });
    }
}