import { json } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/User.js";

const registerUser = async (req,res)=>{
    const {username , password , email} = req.body;
    
    if (!username || !password || !email) {
                return res.status(400).json({ message: "All fields (username, password, email) are required." });
            }

    const userExists =await User.findOne({$or:[{username},{email}]});
    if(userExists) return res.send("user Exists");

    const hashPass = await bcrypt.hash(password , 10);

    const addUser = await User.create({
        "username":username,
        "password":hashPass,
        "email": email.toLowerCase()
    });

    addUser.save();
    console.log("added to user!");
    return res.status(200).send("Created!");
}


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
           "process.env.JWT_SECRET",             
            { expiresIn: '1h' }           
        );
        res.status(200).json({
            message: "Login successful!",
            token, // Send the JWT back to the client
            user: { // Optionally send some public user info
                id: user._id,
                username: user.username,
                email: user.email
            }
        });


    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error during login.", error: error.message });
    }
};

export default registerUser;
