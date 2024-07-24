const express = require("express");
const cors = require("cors");
const app = express();


app.use(express.json());
app.use(cors());

let posts = {};

app.get("/posts", (req, res) => {
    res.status(200).json({ posts });
});


app.post("/events", (req, res) => {
    const { type, data } = req.body;
    if (type === "PostCreated") {
        const { id, title } = data;
        posts[id] = { id, title, comment: [] };
        res.send(posts[id]);
    }
    if (type === "CommentCreated") {
        const { id, content, postId } = data;
        let post = posts[postId];
        post.comment.push({ id, content });
    }
});


app.listen(4002, () => "Query Server running on 4002");
