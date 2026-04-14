require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require('./middlewares/error-handler');
const router = require("./routes");

const app = express();
const { PORT = 3001 } = process.env;

app.use(cors());
app.use(express.json());
app.use("/", router);

app.use((err, req, res, next) => {
  console.error(err);

  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message:
      statusCode === 500
        ? "An error occurred on the server"
        : message,
  });
});

app.use(errorHandler);

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