const express = require('express');
const con = require('../settings/dataBaseConnection');

const route = express.Router();

//Adding Views
route.get("/add/:Vid/:views", (req, res) => {
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

module.exports = route;