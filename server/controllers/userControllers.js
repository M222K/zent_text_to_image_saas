//different controller function for user registration , logout and all with api connection

import userModel from "../models/userModels.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import razorpay from "razorpay"
import transactionModel from '../models/transactionModels.js'

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
            return res.json({
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

//fetch the middleware which will take the userid from token and give
const userCredits = async (req, res) => {
    try {
        const { userId } = req.body
        const user = await userModel.findById(userId);

        if (!user) {
            console.log("user not found!")
        }

        res.json({
            success: true,
            credits: user.creditBalance,
            user: { name: user.name }
        })

    } catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: error.message
        })

    }

}

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
});

const paymentRazorpay = async (req, res) => {
    try {

        const { userId, planId } = req.body;

        const userData = await userModel.findById(userId);
        if (!userId || !planId) {
            return res.json({
                success: false,
                message: "Missing Details"
            });
        }

        //to store the details of transaction
        let credits, plan, amount, date

        switch (planId) {
            case 'Basic':
                plan = "Basic"
                credits = 100
                amount = 10
                break;

            case 'Advanced':
                plan = "Advanced"
                credits = 500
                amount = 50
                break;

            case 'Business':
                plan = "Business"
                credits = 5000
                amount = 250
                break;

            default:
                return res.json({
                    success: false,
                    message: 'Plan not found'
                });
        }

        date = Date.now();

        //object to store the transaction data
        const transactionData = {
            userId, plan, amount, credits, date
        }

        //store the data in mongodb
        const newTransaction = await transactionModel.create(transactionData);

        const options = {
            amount: amount * 100,
            currency: process.env.CURRENCY,
            receipt: newTransaction._id.toString(),
            //unique id by mongo db here as reciept to verify transaction later
        }

        //create order using razorpay
        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error)
                return res.json({
                    success: false,
                    message: error
                })
            }
            res.json({
                success: true,
                order
            })


        })
        //either give error or order


    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })

    }

}

//after completion of the order need to to verify the order to update details from the object passed in response of razorpay payment
const verifyRazorpay = async (req, res) => {
    try {

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.json({
                success: false,
                message: "Missing payment details"
            });
        }

        //get the order info from razorpay
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if (!orderInfo) {
            return res.json({
                success: false,
                message: "Order not found"
            });
        }

        //check status of order
        if (orderInfo.status === 'paid') {
            const transactionData = await transactionModel.findById(orderInfo.receipt);

            if (!transactionData) {
                return res.json({
                    success: false,
                    message: "Transaction not found"
                });
            }

            //by default payment should be false , if it is true then payment already processed
            if (transactionData.payment) {
                return res.json({
                    success: false,
                    message: "Payment already processed"
                })
            }

            //else add payment true and credits in user account
            const userData = await userModel.findById(transactionData.userId);

            if (!userData) {
                return res.json({
                    success: false,
                    message: "User not found"
                });
            }

            const creditBalance = userData.creditBalance + transactionData.credits;
            //current available balance

            await userModel.findByIdAndUpdate(userData._id, {
                creditBalance
            });

            await transactionModel.findByIdAndUpdate(transactionData._id, {
                payment: true
            })

            res.json({
                success: true,
                message: "Credits Added"
            })

        } else {
            res.json({
                success: false,
                message: "Payment Failed !"
            })

        }


    } catch (error) {
        console.log("Verify payment error:", error);
        res.json({
            success: false,
            message: error.message || "Payment verification failed"
        })
    }

}

export { registerUser, loginUser, userCredits, paymentRazorpay,verifyRazorpay };