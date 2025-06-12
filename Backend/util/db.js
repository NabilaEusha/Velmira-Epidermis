import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = async() => {
    const DB = process.env.DB;
    if (!DB) {
        console.error("MongoDB connection string is not defined in environment variables");
        process.exit(1);
    }

    try {
        await mongoose.connect(DB);
        console.log("Database is connected successfully");

        // Add connection event listeners
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected. Attempting to reconnect...');
            setTimeout(dbConnection, 5000);
        });

    } catch (error) {
        console.error("Database connection error:", error);
        console.log("Retrying connection in 5 seconds...");
        setTimeout(dbConnection, 5000);
    }
};

export default dbConnection;