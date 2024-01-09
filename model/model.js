import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config({
//   path: "../.env",
// });
// const clouddb = process.env.MONGODB_URI;
// console.log(process.env.MONGODB_URI);
// console.log(clouddb);

// const options = {};
// mongoose
//   .connect(clouddb, options)
//   .then(() => console.log("connected"))
//   .catch((e) => console.log(e));

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
});
const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default Blog;
