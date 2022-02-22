const jwt = require('jsonwebtoken');
require('dotenv').config();
const express = require('express');
const con = require('../settings/dataBaseConnection');

const route = express.Router();

//Inserting sub comment
route.post("/addSubComment",verifyToken, (req, res) => {
    const CommentId = req.body.MCid; //Main Comment Id
    const Sno = req.body.Sno;
    const Vid = req.body.Vid;
    const comment = req.body.comment;
    const date = req.body.date;

    let q = `insert into subcomments values (null, ${CommentId}, ${Sno}, ${Vid}, "${comment}", "${date}")`;

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
                res.send("subcommentAdded");
                res.end();
            }
        })
    }
    catch(err)
    {
        console.log(err);
    }

});

//Getting all sub comments of a particular video
route.get("/getSubcomment/:MCid", (req, res) => {
    const MCid = req.params.MCid;
    let q = `select * from subcomments, users where subcomments.Cid = ${MCid} and subcomments.Sno = users.Sno`

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
                res.json(result);
                res.end();
            }
        })
    }
    catch(err)
    {
        console.log(err);
    }
});

//Counting number of Sub-comments for main-comment for the support function
route.get("/check/:MCid", (req, res) => {
    const MCid = req.params.MCid;
    let q = `select count(*) as NSubComment from subcomments where Cid = ${MCid}`;

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

//Adding Sub Comments Likes
route.post("/addLike",verifyToken, (req, res) => {
    const Cid = req.body.Cid;
    const Sno = req.body.Sno;
    let q = `insert into clikes values(null, ${Cid}, ${Sno})`;

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
                res.send("inserted");
                res.end();
            }
        })
    }
    catch(err)
    {
        console.log(err);
    }
});

//Select weather a user liked or not
route.get("/checkLike/:Cid/:Sno",verifyToken, (req, res) => {
    const Sno = req.params.Sno;
    const Cid = req.params.Cid;
    let q = `select * from clikes where Sno=${Sno} and Cid=${Cid}`;

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
                if(result.length != 0)
                {
                    res.send("yes");
                    res.end();
                }
                else
                {
                    res.send("no");
                    res.end();
                }
            }
        })
    }
    catch(err)
    {
        console.log(err);
    }
})

//Unlike
route.get("/delLike/:Cid/:Sno",verifyToken, (req, res) => {
    const Sno = req.params.Sno;
    const Cid = req.params.Cid;
    let q = `delete from clikes where Sno=${Sno} and Cid=${Cid}`;

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
                if(result.length != 0)
                {
                    res.send("yes");
                    res.end();
                }
                else
                {
                    res.send("no");
                    res.end();
                }
            }
        })
    }
    catch(err)
    {
        console.log(err);
    }
});

//Getting total number of Likes for a subComment
route.get("/getNumber/:Cid", (req, res) => {
    const Cid = req.params.Cid;
    let q = `select count(*) as numLikes from clikes where Cid = ${Cid}`;

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
                res.json(result);
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