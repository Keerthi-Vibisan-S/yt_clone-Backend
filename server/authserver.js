const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get("/", (req, res) => {
    res.send("This is authentication Server SECURED");
    res.end();
})

// app.get("/getToken", (req, res) => {

// })

app.listen(2023, () => {
    console.log("Auth Server Started");
    console.log("Listening on 2023");
})