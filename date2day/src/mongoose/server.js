import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;

mongoose
    .connect(uri)
    .then(() =>
        console.log("MongoDB connected!").catch((err) => console.log(err))
    );
