import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./config/db.js";
import productroute from "./routes/productroute.js"
import path from "path"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();
app.use(express.json());

app.use("/api/products", productroute)

// For DEPLOYMENT
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve (__dirname, "frontend", "dist", "index.html"))
    })
}


app.listen (PORT , ()=>{
    connectDb();
    console.log(`server started at http://localhost:${PORT}`);
})

