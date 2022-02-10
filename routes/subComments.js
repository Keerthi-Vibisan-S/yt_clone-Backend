const express = require('express');
const con = require('../settings/dataBaseConnection');

const route = express.Router();

//Inserting sub comment
route.post("/addSubComment", (req, res) => {
    const CommentId = req.body.Cid; //Main Comment Id
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

})

module.exports = route;