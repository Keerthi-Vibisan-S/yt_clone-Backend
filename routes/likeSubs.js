const express = require('express');
const con = require('../settings/dataBaseConnection');

const route = express.Router();

//Getting all subscriptions of a single user
route.get("/getSubscriptions/:Sno", (req, res) => {
    const Sno = req.params.Sno;
    let q = `select * from subscriptions, channels where subscriptions.Sno=${Sno} and channels.Cno = subscriptions.Cno`;

    try
    {
        con.query(q, (err, result) => {
            if(err)
            {
                console.log(err);
            }

            else
            {
                console.log(result);
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

//Getting Existing Like
route.get("/getLike/:Sno/:Vid", (req, res) => {
    const Sno = req.params.Sno;
    const Vid = req.params.Vid;
    let q = `select * from likes where Sno=${Sno} and Vid = ${Vid}`;
    try
    {   
        con.query(q, (err, result) => {
            if(err)
            {
                console.log(err);
            }

            else
            {
                if(result.length == 0)
                {
                    res.send("nothing");
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
        console.log(err);
    }
})

//Adding Like
route.get("/setLike/:Sno/:Vid", (req, res) => {
    const Sno = req.params.Sno;
    const Vid = req.params.Vid;
    let q = `insert into likes values(null,${Sno},${Vid})`;
    try
    {   
        con.query(q, (err, result) => {
            if(err)
            {
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
})

//removing Like
route.get("/remove/:Sno/:Vid", (req, res) => {
    const Sno = req.params.Sno;
    const Vid = req.params.Vid;
    let q = `delete from likes where Sno=${Sno} and Vid=${Vid}`;
    try
    {
        con.query(q, (err, result) => {
            if(err)
            {
                console.log(err);
            }

            else
            {
                res.send("deleted");
                res.end();
            }
        });
    }
    catch(err)
    {
        console.log(err);
    }
})

//Getting number of likes for a video
route.get("/numLike/:Vid", (req, res) => {
    const Vid = req.params.Vid;
    let q  = `select count(*) as likesnum from likes where Vid = ${Vid}`;

    try
    {   
        con.query(q, (err, result) => {
            if(err)
            {
                console.log(err);
            }
            else
            {
                console.log(result);
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

//Getting all Likes
route.get("/getMyLikes/:Sno", (req, res) => {
    const Sno = req.params.Sno;
    let q = `select * from likes, uploads, channels where likes.Sno = ${Sno} and likes.Vid = uploads.Vid and  uploads.Cno = channels.Cno;`;
    try
    {
        con.query(q, (err, result) => {
            if(err)
            {
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
})
module.exports = route;