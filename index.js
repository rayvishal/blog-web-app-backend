import express from "express";
import Blog from "./model/model.js";
import mongoose from "mongoose";

const app = express();
import cors from "cors";
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import dotenv from "dotenv";
dotenv.config({
  //   path: "../.env",
});
const clouddb = process.env.MONGODB_URI;
console.log(process.env.MONGODB_URI);
console.log(clouddb);

const options = {};
mongoose
  .connect(clouddb, options)
  .then(() => {
    console.log("connected");

    app.listen(5000, (req, res) => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((e) => console.log(e));

app.get("/api/blog", async (req, res) => {
  try {
    const allblog = await Blog.find();
    res.status(200).json(allblog);
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/blog", async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const sendData = await Blog.create(data);
    res.status(200).json(sendData);
  } catch (error) {
    console.log(error);
  }
});
app.get("/api/singleblog/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const getSingleBlog = await Blog.findById(id);
    console.log(getSingleBlog);
    res.status(200).json(getSingleBlog);
  } catch (error) {
    console.log(error);
  }
});
app.delete("/api/deleteblog/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    res.status(200).json("Deleted");
  } catch (error) {
    console.log(error);
  }
});
app.patch("/api/update/:id", async (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  try {
    const updated = await Blog.findByIdAndUpdate(id, req.body);
    res.json("Updated");
  } catch (error) {
    console.log(error);
  }
});
// app.listen(5000, (req, res) => {
//   console.log("Server is running on port 5000");
// });
