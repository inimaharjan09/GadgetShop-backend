import express from "express";
import morgan from "morgan";
import productRoutes from "./routes/productRoutes.js";
import mongoose from "mongoose";

const app = express();

//database connect
mongoose.connect('mongodb+srv://inima09:June14inima@cluster0.rmpnkba.mongodb.net/GShop')
.then((val) => {
    //console.log(val);

    app.listen(5000, () => {
    console.log("DATABASE CONNECTED and SERVER IS LISTENING");
});
}).catch((err) => {
    console.log(err);
})

//middleware
app.use(morgan('dev'));
app.use(express.json());


app.get('/', (req, res) => {
    return res.status(200).json({
        messgae: 'WELCOME TO BACKEND'
    });
});



app.use(productRoutes);