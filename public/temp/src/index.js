
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";

dotenv.config();

const start = async () => {
  try {
    await connectDB();

    const app = express();

    app.get("/", (req, res) => {
      res.send("Server is up and running");
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Startup error:", error);
    process.exit(1);
  }
};

start();