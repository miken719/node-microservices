const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());
let commentsByPosts = {};
app.get("/posts/:id/comments", (req, res) => {
    res.status(200).send(commentsByPosts[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
    let commentId = randomBytes(4).toString("hex");
    const { content } = req.body;
    const { id } = req.params;

    const comments = commentsByPosts[id] || [];
    comments.push({ id: commentId, content });
    commentsByPosts[id] = comments;
    await axios.post("http://localhost:4005/events", { type: "CommentCreated", data: { id: commentId, content, postId: id } });
    res.status(201).send(commentsByPosts);
});
app.post("/events", (req, res) => {
    console.log("Event Received: ", req.body.type);
    res.send({});

});
app.listen(4000, () => console.log("Server listing on 4000"));