const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const router = require("./routes");

const app = express();
const { PORT = 3001 } = process.env;

app.use(cors());
app.use(express.json());
app.use("/", router);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });