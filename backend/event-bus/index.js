const axios = require("axios");
const express = require("express");
const app = express();
app.use(express.json());

app.post("/events", (req, res) => {
    const event = req.body;
    axios.post("http://localhost:8080/events", event);
    axios.post("http://localhost:4000/events", event);
    axios.post("http://localhost:4002/events", event);
    res.send({ status: "OK" });
});

app.listen(4005, () => "Event Bus starting on port 4005");