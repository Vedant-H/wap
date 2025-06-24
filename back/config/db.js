import mongoose from "mongoose";

const connectDB = async ()=>
{  
    try {
        const client = await mongoose.connect("mongodb://127.0.0.1:27017/stayfinder");
    console.log("DB connected!!");
    } catch (error) {
        console.log(error);
    }
}

export function demo(){
    console.log("hello");
}

export default connectDB;