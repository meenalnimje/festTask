const express = require("express");
const dbconnect = require("./dbConnect");
const dotenv = require("dotenv");
const authRouter = require("./router/authRouter");
const cookieParser = require("cookie-parser");
dotenv.config("./.env");
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("this is the home side");
});
app.use("/user", authRouter);
dbconnect();
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
