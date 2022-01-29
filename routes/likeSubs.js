const express = require('express');
const con = require('../settings/dataBaseConnection');

const route = express.Router();

//Getting all subscriptions of a single user
// route.get("/getSubscriptions/:Sno", (req, res) => {
//     const Sno = req.params.Sno;
//     let q = `select * from subscriptions where Sno=${Sno}`;
// })

//add Subscribe
route.post("/addSub", (req, res) => {
    const Sno = req.body.Sno;
    const Cno = req.body.Cno;
    let q = `insert into subscriptions values(null, ${Sno}, ${Cno})`;
    
    try
    {
        con.query(q, (err, result) => {
            if(err)
            {
                console.log(err);
            }

            else{
                res.send("okay");
                res.end();
            }
        })
    }

    catch(err)
    {
        console.log("Error occured in subs insert --- "+err);
    }
});

//Getting existing subs
route.get("/getSub/:Sno/:Cno", (req, res) => {
   const Sno = req.params.Sno;
   const Cno = req.params.Cno;
    let q = `select * from subscriptions where Sno=${Sno} and Cno=${Cno}`;

   try
   {
        con.query(q, (err, result) => {
            if(err)
            {
                console.log(err);
            }

            else
            {
                if(result.length === 0)
                {
                    res.send("");
                    res.end();
                }

                else
                {
                    res.send("yes");
                    res.end();
                }
            }
        })
   }
   catch(err)
   {
       console.log("error while fetching sub --- "+err);
   }
});

//Deleting sub
route.get("/unsub/:Sno/:Cno", (req, res) => {
    const Sno = req.params.Sno;
    const Cno = req.params.Cno;

    let q = `delete from subscriptions where Sno=${Sno} and Cno=${Cno}`;

    try
    {
        con.query(q, (err, result) => {
            if(err)
            {
                console.log(err);
            }

            else
            {
                console.log("executing ----");
                res.send("unsub");
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