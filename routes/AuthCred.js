const express = require('express');
const con = require('../settings/dataBaseConnection');


const route = express.Router();

route.get('/details/:email', (req, res) => {
    const email = req.params.email;
    console.log(email+" --- Request Get");
    var q = `select * from users where email="${email}"`;

    try
    {
        con.query(q,(err, result) => {
            if(err)
            {
                console.log("Something went Wrong --- "+err);
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
        console.log("An ERROR --- "+err);
    }
})

route.post('/', (req, res) => {
    let email = req.body.email;
    console.log(email+"---");
    var q = `select * from users where email="${email}"`;
    try
    {
        con.query(q, (err, result) => {
            if(err)
            {
                console.log("An Error Occurred --- "+err);
            }

            else
            {
                console.log(result);
                console.log("Length: "+(result.length));
                if(result.length == 0)
                {
                    res.send("Empty");
                }
                else{
                    res.send("Present");
                }
            }
        });
    }
    catch(err)
    {
        console.log("Database ERROR --- "+err);
    }
});

route.post("/register", (req, res) => {
    let imgurl = req.body.imageUrl;
    let name = req.body.name;
    let email = req.body.email
    console.log(imgurl);
    console.log(name);

    try
    {
        let q = `insert into users values(null, '${imgurl}', '${name}', '${email}', "not given", "viewer")`;
        con.query(q, (err, result) => {
            if(err)
            {
                console.log("Error Occurred while inserting --- "+err);
            }
            else
            {
                console.log(result);
                res.send("ok");
            }
        })
    }
    catch(err)
    {
        console.log("Error Occurred --- "+err);
    }
});

//This after creating channel to change user type
route.get("/changeUser/:sno", (req, res) => {
    const Sno = parseInt(req.params.sno);
    let q = `update users set usertype="Creator" where Sno=${Sno}`;

    try
    {
        con.query(q, (err, result) => {
            if(err)
            {
                console.log(err);
            }

            else{
                console.log(result);
                res.send("updated");
            }
        })
    }
    catch(err)
    {
        console.log(err);
    }
});


//Exporting the routes {get,post}
module.exports = route;