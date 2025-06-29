import express from 'express';
import morgan from 'morgan';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//database connect
mongoose
  .connect(process.env.MONGO_URI)
  .then((val) => {
    //console.log(val);
    app.listen(PORT, () => {
      console.log(`DATABASE CONNECTED and SERVER IS LISTENING on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    abortOnLimit: true,
  })
);

app.use(express.static('uploads'));

app.get('/', (req, res) => {
  return res.status(200).json({
    messgae: 'WELCOME TO BACKEND',
  });
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
