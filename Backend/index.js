import express, { urlencoded } from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from 'dotenv'
const app = express();
import connectDB from './utils/db.js';

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser()) // agar ye nhi krenge to jo frontend se data arha h uski cookie me token to hoga lekin vo parse nhi hoga

const setOrigin = {
    origin : 'http//localhost:5173',
    credentials :true
}
app.use(cors({setOrigin}))

dotenv.config({});

// Listening Route
const PORT = process.env.PORT;
app.listen(PORT, (req,res) => {
    connectDB();
    console.log(`App is listening on port ${PORT}` );
})