const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db.js");
const AuthRouter = require("./router/AuthRouter.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 6000;

// data base connection
connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL, // frontend's origin(s) allowed
    credentials: true, // Allow credentials (e.g., cookies) to be included in requests
  })
);

app.use("/api/auth", AuthRouter);

app.use("/", (req, res) => {
  res.send("Hello World");
});

// module.exports = app;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
