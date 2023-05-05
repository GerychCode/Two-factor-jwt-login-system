import express from "express";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser"
import user_router from "./src/routers/user-routers.js";
import errorMiddleware from "./src/middleware/error.middleware.js";
dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/user', user_router);

app.use(errorMiddleware);

app.listen(PORT, () => console.log("Server started on port " + PORT ))