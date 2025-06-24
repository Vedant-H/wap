import express from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import cors from "cors";
import { json } from "express";
import connectDB , {demo} from "./config/db.js"
import router from "./routes/authRoute.js";

connectDB();
demo();
const app = express();

app.use(cors())
app.use(json())
app.use(express.urlencoded({extends:true}))

app.use("/api/auth",router);

app.listen(3000,()=>{
    console.log("Server Running On port 3000!");
})