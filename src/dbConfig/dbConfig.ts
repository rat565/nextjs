import { connect } from "http2";
import mongoose from "mongoose";

type ConnectionObject={
    isConnected?: number;
}
const connectionObject: ConnectionObject = {};

async function dbConnect():Promise<void> {
    const MONGODB_URI = process.env.MONGO_URL || "";

    if (connectionObject.isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    try {
        const db = await mongoose.connect(MONGODB_URI)
        connectionObject.isConnected = db.connections[0].readyState;
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error("Failed to connect to MongoDB");
    }

}
export default dbConnect;