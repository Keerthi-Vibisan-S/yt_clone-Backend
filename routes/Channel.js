const jwt = require('jsonwebtoken');
require('dotenv').config();
const express = require('express');
const con = require('../settings/dataBaseConnection');

const route = express.Router();

//For Creating a new Channel
route.post("/create",verifyToken, (req, res) => {
    const Sno = parseInt(req.body.Sno);
    const cname = req.body.cname;
    const about = req.body.about;
    const date = req.body.date;
    const cimg = req.body.cimg;

    let q = `insert into channels values(null, ${Sno}, "${cname}", "${about}", "${date}", "${cimg}")`;

    try
    {
        con.query(q, (err, result) => {
            if(err)
            {
                console.log(err);
            }

            else{
                console.log(result);
                res.send("Channel-Created");
            }
        })
    }
    catch(err)
    {
        console.log("An error while inserting CHANNEL ---- "+err);
    }
});


//For GETting channel Details
route.get("/details/:Sno", (req, res) => {
    const Sno = req.params.Sno;
    let q = `select * from channels where Sno = ${Sno}`;

    try
    {
        con.query(q, (err, result) => {
            if(err)
            {
                console.log(err);
            }

            else
            {
                res.send(result);
            }
        })
    }
    catch(err)
    {
        console.log("Error while GETTING CHANNEL --- ");
    }
});

//Getting all videos uploaded to a channel
route.get("/getAllVideos/:Cno", (req, res) => {
    const Cno = req.params.Cno;
    let q = `select * from uploads, channels where uploads.Cno = ${Cno} and uploads.Cno = channels.Cno order by upload_date desc`;

    try
    {
        con.query(q, (err, result) => {
            if(err)
            {
                res.status(500);
                console.log(err);
            }

            else
            {
                res.status(200);
                res.json(result);
                res.end();
            }
        })
    }
    catch(err)
    {
        console.log("Error ---- "+err);
    }

});

function verifyToken(req, res, next)
{
    const bearerToken = req.headers.authorization;
    const token = bearerToken && bearerToken.split(' ')[1];
    const ref_token = req.body.refresh_token;
    console.log("-----");
    console.log(ref_token);
    const newCred = {};

    if(token==null)
    {
        res.sendStatus(401);
    }

    else
    {
        jwt.verify(token, process.env.SECRET_KEY, (err, value) => {
            if(err)
            {
               console.log(err);
               res.sendStatus(403);
            }

            else
            {
                console.log("----- JWT Authentication -----");
                console.log(value);
                next();
            }
        })
    }
}

module.exports = route;