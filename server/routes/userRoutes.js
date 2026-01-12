import express from "express"
import { registerUser, loginUser } from "../controllers/userControllers.js"

//creating the api endpoint for user
const userRouter=express.Router();

userRouter.post('/register',registerUser);
//on this path it will execute the register functionality from backend

userRouter.post('/login', loginUser);

export default userRouter;


