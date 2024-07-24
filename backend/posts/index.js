const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
//middleware
const app = express();
app.use(express.json());
app.use(cors());


let posts = {};
app.get("/posts", (req, res) => {
    res.status(200).json({ status: 200, data: posts });
});

app.post("/posts", async (req, res) => {
    let id = randomBytes(4).toString("hex");
    const { title } = req.body;
    posts[id] = {
        id, title

    };
    await axios.post("http://localhost:4005/events", { type: "PostCreated", data: { id, title } });
    res.status(201).json({ status: 200, posts });
});
app.post("/events", (req, res) => {
    console.log("Event Received:", req.body.type);
    res.send({});
});
app.listen(8080, () => console.log(`Server start on ${8080}`));