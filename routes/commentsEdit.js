const express = require("express");
const con = require("../settings/dataBaseConnection");

const cors = require('cors');

const app = express();
app.use(cors());

const route = express.Router();

//! Delete Request
route.delete("/comment/:Cid/:Sno",(req, res) => {
    const Cid = req.params.Cid;
    const Sno = req.params.Sno;
    let q = `delete from comments where Cid=${Cid} and Sno=${Sno}`;

    try
    {
        con.query(q, (err, result) => {
            if(err)
            {
                console.log(err);
            }

            else{
                console.log(result);
                res.send("deleted");
                res.end();
            }
        })
    }
    catch(err)
    {
        console.log(err);
    }
});

//! Sub-Comments Delete
route.delete("/deleteSubcom/:Sub_id/:Sno", (req, res) => {
    const Sub_id = req.params.Sub_id;
    const Sno = req.params.Sno;
    let q = `delete from subcomments where Sub_id=${Sub_id} and Sno=${Sno}`;

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
                res.send("deleted");
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