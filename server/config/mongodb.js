import mongoose from "mongoose";

const connectDB = async () => {

    //event to check the db connected
    mongoose.connection.on('connected', () => {
        console.log("Database Connected")
    })

    await mongoose.connect(`${process.env.MONGODB_URL}/zent`)
}

export default connectDB;