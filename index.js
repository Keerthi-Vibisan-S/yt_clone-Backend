const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();

//Allowing Cross Platform
app.use(cors());

//Allowing file uploads
app.use(fileUpload());

//As we are using JSON
app.use(express.json());

//Routing Connections
var auth = require('./routes/AuthCred');
app.use('/auth', auth);

var channel = require('./routes/Channel');
app.use('/channel', channel);

var video = require('./routes/video');
app.use("/video", video);

//Server Listen
app.listen(2022, () => {
    console.log("Server Started -- Port:2022");
})