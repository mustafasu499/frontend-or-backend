import express from "express";
import { data } from "./data.js ";
import mongoose from "mongoose";
import postModel from "./Models/postModel.js";
import bcrypt from "bcryptjs";
import userModel from "./Models/userModel.js";
import cors from "cors";
import "dotenv/config";
const app = express();

const Port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const DBURI = process.env.MONDODB_URI;

mongoose.connect(DBURI);

mongoose.connection.on("connected", () => console.log("MongoDB Connected"));

mongoose.connection.on("error", (err) => console.log("MongoDB Error", err));

app.listen(Port, (req, res) => {
  console.log(`server is running on port ${Port}`);
});
app.get("/", (req, res) => {
  res.json("server start");
});

app.post("/createpost", async (req, res) => {
  const { title, desc, postId } = req.body;
  if (!title || !desc || !postId) {
    res.json({
      message: "required fields  are missing",
    });
    return;
  }
  const postObj = {
    title,
    postId,
    desc,
  };

  const response = await postModel.create(postObj);
  res.json({
    message: "post created successfully",
    data: response,
  });
  res.send("create post");
});

app.get("/getpost", async (req, res) => {
  // const getData = await postModel.find({}); // find all data

  // const getData = await postModel.findOne({});  //Top 1 post hi ayega
  // const getData = await postModel.findById({});  // get data  by id
  // const getData = await postModel.findByIdAndDelete({});  // get data  by id  and delete it
  // const getData = await postModel.findByIdAndUpdate({}); // get data  by id and update
  const getData = await postModel.find({});

  res.json({
    message: "post data get successfully",
    data: getData,
  });
});

app.put("/updatepost", async (req, res) => {
  const { title, desc, postId } = req.body;
  console.log(title, desc, postId);
  const updatePost = await postModel.findByIdAndUpdate(postId, {
    title,
    desc,
  });

  res.json({
    message: "post updated successfully",
    data: updatePost,
  });
});

app.delete("/deletepost/:id", async (req, res) => {
  const params = req.params.id;

  await postModel.findByIdAndDelete(params);
  res.json({
    message: "post deleted successfully",
  });
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

  if (!email || !password) {
    res.json({ message: "required fields are missing", status: false });
    return;
  }
  const userEmail = await userModel.findOne({ email });
  console.log(userEmail);

  if (!userEmail) {
    res.json({
      message: "invalid email & passwrod",
      status: false,
    });
    return;
  }
  const isMatch = await bcrypt.compare(password, userEmail.password);
  if (!isMatch) {
    res.json({
      message: "invalid email & passwrod",
      status: false,
    });
    return;
  }
  res.json({
    message: "user  login successfully",
    status: true,
  });
});
// app.get("/", (req, res) => {
//   res.send("Port in running 3000 ");
// });

// app.get("/products", (req, res) => {
//   res.send(data);
// });

// app.get("/products/:id", (req, res) => {
//   console.log(req.params);
//   const filterData = data.filter((e, i) => {
//     return e.id == req.params.id;
//   });
//   res.send(filterData);
// });
// app.get("/products", (req, res) => {
//   console.log(req.query);
//   if (req.query.id) {
//     const filterData = data.filter((e, i) => e.id == req.query.id);

//     res.send(filterData);
//     return;
//   }
//   res.send(data);
// });

// app.get("/app/api", (req, res) => {
//   res.send("get Data");
// });

// app.post("/app/api", (req, res) => {
//   console.log(req.body);
//   res.send("hello");
// });
// app.put("/app/api", (req, res) => {
//   res.send("put Data");
// });
// app.delete("/app/api", (req, res) => {
//   res.send("delete Data");
// });
