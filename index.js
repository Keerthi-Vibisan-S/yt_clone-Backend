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

var LikeSubs = require('./routes/likeSubs');
app.use("/media", LikeSubs);

var views = require('./routes/views');
app.use("/views", views);

var comments = require('./routes/comments');
app.use("/comments", comments);

var subComments = require('./routes/subComments');
app.use("/subComment", subComments);

//Server Listen
app.listen(2022, () => {
    console.log("Server Started -- Port:2022");
})