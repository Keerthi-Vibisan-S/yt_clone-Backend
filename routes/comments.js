const jwt = require('jsonwebtoken');
require('dotenv').config();
const express = require('express');
const con = require('../settings/dataBaseConnection');

const route = express.Router();

route.post("/add",verifyToken, (req, res) => {
    const Sno = req.body.Sno;
    const Vid = req.body.Vid;
    const comment = req.body.comment;
    const date = req.body.date;
    
    let q = `insert into comments values(null, ${Sno}, ${Vid}, "${comment}", "${date}", "0")`;
    try
    {
        con.query(q, (err, result) => {
            if(err)
            {
                res.status(500);
                res.end();
                console.log(err);
            }
            else{
                res.send("ok");
                res.end();
            }
        })
    }
    catch(err)
    {
        console.log(err);
    }
})

//Getting all comments of a particular video
route.get("/get/:Vid", (req, res) => {
    
    const Vid = req.params.Vid;
    let q = `select * from comments, users where comments.Vid=${Vid} and comments.Sno = users.Sno order by datez`;

    try
    {
        con.query(q, (err, result) => {
            if(err)
            {
                res.status(500);
                res.end();
                console.log(err);
            }
            else
            {
                res.send(result);
                res.end();
            }
        })
    }
    catch(err)
    {
        console.log(err);
    }
})

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