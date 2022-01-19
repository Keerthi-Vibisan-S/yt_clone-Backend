const express = require('express');
const con = require('../settings/dataBaseConnection');

const route = express.Router();

//For Creating a new Channel
route.post("/create", (req, res) => {
    const Sno = parseInt(req.body.Sno);
    const cname = req.body.cname;
    const about = req.body.about;
    const date = req.body.date;

    let q = `insert into channels values(null, ${Sno}, "${cname}", "${about}", "${date}")`;

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


module.exports = route;