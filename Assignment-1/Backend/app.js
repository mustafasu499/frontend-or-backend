import express from "express";
import mongoose, { Mongoose } from "mongoose";
import bcrypt from "bcryptjs";
import userModel from "./Models/userModel.js";
import cors from "cors";
const app = express();

const Port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const DBURI =
  "mongodb+srv://mustafasu498:mustafasu498@cluster0.2jcrq.mongodb.net/";

mongoose.connect(DBURI);

mongoose.connection.on("connected", () => console.log("MongoDB Connected"));

mongoose.connection.on("error", (err) => console.log("MongoDB Error", err));

app.listen(Port, (req, res) => {
  console.log(`server is running on port ${Port}`);
});
app.get("/", (req, res) => {
  res.json("server start");
});

app.post("/signUpApi", async (req, res) => {
  const { name, userName, email, password } = req.body;
  if (!name || !userName || !email || !password) {
    res.json({ message: "required fields are missing", status: false });
    return;
  }
  const existingUser = await userModel.findOne({ email });
  if (existingUser !== null) {
    res.json({ message: "user already exist", status: false });
    return;
  }
  const hashPassword = await bcrypt.hash(password, 10);
  let userObj = {
    name,
    userName,
    email,
    password: hashPassword,
  };
  await userModel.create(userObj);
  res.json({
    message: "user create  successfully",
    status: true,
  });
});
app.post("/loginApi", async (req, res) => {
  const { email, password } = req.body;
  const userEmail = await userModel.findOne({ email });

  console.log(userEmail);

  if (!userEmail) {
    res.json({
      message: "invalid email & password",
      status: false,
    });
    return;
  }

  const isMatch = await bcrypt.compare(password, userEmail.password);
  if (!isMatch) {
    res.json({
      message: "invalid email & password",
      status: false,
    });
    return;
  }
  res.json({
    message: "user  login successfully",
    status: true,
  });
});
