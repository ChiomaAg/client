const express =  require("express")
const app = express();
const posts = require("./routes/posts.js")

PORT=process.env.PORT;

app.use(express.json());
app.use("/post", posts);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});