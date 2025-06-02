import express from "express";
import morgan from "morgan";
import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use(morgan('dev'));
app.use(express.json());


app.get('/', (req, res) => {

    return res.status(200).json({
        messgae: 'WELCOME TO BACKEND'
    });
});

app.listen(5000, () => {
    console.log("SERVER IS LISTENING");
});

app.use(productRoutes);