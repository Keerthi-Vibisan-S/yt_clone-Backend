const express = require('express');
const con = require('../settings/dataBaseConnection');

const route = express.Router();

route.get("/do/:name", (req, res) => {
    const name = req.params.name;
    let query = `select * from channels, uploads where channels.Cno = uploads.Cno and vname like "${name}%"`;

    try
    {
        con.query(query, (err, result) => {
            if(err)
            {
                console.log("Error Occurred");
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