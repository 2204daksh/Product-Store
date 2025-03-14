import mongoose from "mongoose"

export const connectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected : ",conn.connection.host);
    }
    catch(err){
        console.log("Error in db connection : ",err);
        process.exit(1); // 1 means exit with failure 0 for success
    }
}