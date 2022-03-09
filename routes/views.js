const jwt = require('jsonwebtoken');
require('dotenv').config();
const express = require('express');
const con = require('../settings/dataBaseConnection');

const route = express.Router();

//Adding Views
route.get("/add/:Vid/:views",verifyToken, (req, res) => {
    const Vid = parseInt(req.params.Vid);
    const Views = parseInt(req.params.views);
    let q = `update uploads set views = ${1+Views} where Vid = ${Vid}`;

    try
    {
        con.query(q, (err, result) => {
            if(err)
            {
                console.log(err);
            }

            else
            {
                res.send("Views Counted");
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
    console.log("-----");
    // console.log(ref_token);
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