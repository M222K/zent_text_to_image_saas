//different controller function for user registration , logout and all with api connection

import userModel from "../models/userModels";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const registerUser = async (req, res) => {
    //to register the user we need name , email id and password we will get this from the request body
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({
                success: false,
                message: "Missing Details"
            })
        }

        //encrypt the password-learn about salt method
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //we will store the recieved data in the object and then store it in a mongodb
        const userData = {
            name, email, password: hashedPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save(); //we will get user in this variable

        //generate token for authentication
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        //send the token in response

        res.json({
            success: true,
            token,
            user: { name: user.name }
        });



    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

const loginUser = async (req, res) => {
    //here we take email and password from the user body and then check the data with token and hashed password
    try {
        const { email, password } = req.body;
        //find the existing user based on one of the params

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "User doesn't exist !"
            })
        }

        //match the password
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

            res.json({
                success: true,
                token,
                user: { name: user.name }
            })

        } else {
            return res({
                success: false,
                message: "Invalid credentials!"
            })
        }


    } catch (error) {

        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }

}

export  default {registerUser,loginUser};