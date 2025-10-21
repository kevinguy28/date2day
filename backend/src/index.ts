import express, { urlencoded } from "express";

import cors from "cors";
import datesRoute from "../routes/date.route.ts";
import mongoose from "mongoose";
import placesRoute from "../routes/place.route.ts";

const app = express();

// app.use(cors());
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/places", placesRoute);

app.use("/api/dates", datesRoute);

app.get("/", (req, res) => {
    res.send("Hello from NODE APi!!!!!!!!");
});

mongoose
    .connect(
        "mongodb+srv://kevinhuytran1128_db_user:LA40PojrcIDltCNc@date2daybackend.mnqawi0.mongodb.net/?retryWrites=true&w=majority&appName=Date2DayBackend"
    )
    .then(() => {
        console.log("DB Conncted");
        app.listen(3000, () => {
            console.log("Server running on http://localhost:3000");
        });
    })
    .catch(() => {
        console.log("DB Failed");
    });
