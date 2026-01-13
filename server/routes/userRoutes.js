import express from "express"
import { registerUser, loginUser, userCredits } from "../controllers/userControllers.js"
import userAuth from "../middlewares/auth.js"

//creating the api endpoint for user
const userRouter=express.Router();

userRouter.post('/register',registerUser);
//on this path it will execute the register functionality from backend

userRouter.post('/login', loginUser);

userRouter.get('/credits',userAuth, userCredits);

export default userRouter;


