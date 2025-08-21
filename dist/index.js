"use strict";
// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import userRoutes from './route.js'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config();
// const connectDb = async() =>{
//   try {
//     mongoose.connect(process.env.MONGO_URI as string,{
//       dbName:"Spotify",
//     });
//     console.log("Mongo DB Coneccted");
//   } catch (error) {
//     console.log(error);
//   }
// }
// const app = express();
// app.use("/api/v1",userRoutes);
// app.get("/",(req,res) => {
//   res.send("Server is working");
// });
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`🚀 Server running on port ${port}`);
//   connectDb();
// });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const route_js_1 = __importDefault(require("./route.js"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const connectDb = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI, {
            dbName: "Spotify",
        });
        console.log("✅ MongoDB Connected");
    }
    catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1", route_js_1.default);
app.get("/", (req, res) => {
    res.send("Server is working");
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
    connectDb();
});
//# sourceMappingURL=index.js.map