const express = require('express');
const con = require('../settings/dataBaseConnection');


const route = express.Router();

route.get('/', (req, res) => {
    var email = String (req.body.email);
    var passwd = String (req.body.passwd);
    console.log(email+"---"+passwd);
    var q = `select * from users where email='${email}' and passwd='${passwd}'`;
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
                res.json(result);
            }
        });
    }
    catch(err)
    {
        console.log("Database ERROR --- "+err);
    }
});


//Exporting the routes {get,post}
module.exports = route;