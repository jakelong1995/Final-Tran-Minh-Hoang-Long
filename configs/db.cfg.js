// getting-started.js
import mongoose from'mongoose';
import dotenv from 'dotenv';

const uri = `mongodb+srv://${process.env.MONGODB_UNAME}:${process.env.MONGODB_PWD}@web76cluster.ttoub03.mongodb.net/${process.env.MONGODB_DB_NAME}?retryWrites=true&w=majority&appName=web76cluster`;
export const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to database successfully');
    } catch (error) {
        console.log(error.message)
    }
}


