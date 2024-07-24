import express, { urlencoded } from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js'

const app = express();

//Middleware
app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(cookieParser()) // agar ye nhi krenge to jo frontend se data arha h uski cookie me token to hoga lekin vo parse nhi hoga

// Setting up the cors origin
const setOrigin = {
    origin : 'http//localhost:5173',
    credentials :true
}
app.use(cors({setOrigin}))

dotenv.config();

connectDB();

// setting apis
app.use("api/v1/user", userRoute);

// Listening Route
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
});