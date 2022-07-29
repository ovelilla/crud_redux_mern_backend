import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

await connectDB();

const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (whiteList.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};

app.use(cors(corsOptions));

app.use("/api/product", productRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});