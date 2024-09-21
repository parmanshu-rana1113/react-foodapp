import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.route";
import restaurantRoute from "./routes/restaurant.route";
import menuRoute from "./routes/menu.route";
import orderRoute from "./routes/order.route";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;


//default middleware for any mern
app.use(bodyParser.json({ limit: '10mb' })); //reqiest se jab b data bhejenge to uski limit hogiii
app.use(express.urlencoded({ extended: true, limit: '10mb' })); //internet searcch krna
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5173", // Removed trailing slash
    credentials: true,
};

app.use(cors(corsOptions));

//api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order",orderRoute);


// https://localhost:8000/api/v1/user/jo bhi route hai

app.listen(PORT, () => {
    connectDB();
    console.log(`server listen at ${PORT}`);
})
