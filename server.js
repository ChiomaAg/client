import express from "express";
import posts from "./routes/posts.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/post", posts);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
