import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
var cookieParser = require('cookie-parser')

import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import path from 'path';
mongoose.connect(process.env.MONGO_CONNECTION_STRING as string).then(() => {
   console.log("connected to database", process.env.MONGO_CONNECTION_STRING) 
})

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: true}));

console.log("url", process.env.FRONTEND_URL)
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.static(path.join(__dirname, '../../frontend/dist')))
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


app.listen(7000, () => {
    console.log("server is running on 7000")
})