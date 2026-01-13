// create simple express app for server
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js';

const PORT = process.env.PORT || 4000;
const app = express();


//middlewares
app.use(express.json())
app.use(cors());

// Connect to database with error handling
try {
    await connectDB();
} catch (error) {
    console.error("Failed to start server due to database connection error:", error.message);
    process.exit(1);
}

app.use('/api/user',userRouter);  //whenever we type localhost url /this it will hit the api to get the data-test it via postman


app.get('/', (req, res) => {
    res.send("API Working")
})

//listen to port when we start the server
app.listen(PORT, () => {
    console.log('Server running on port:', PORT);
})

