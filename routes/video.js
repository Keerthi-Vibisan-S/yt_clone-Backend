const express = require('express');
const con = require('../settings/dataBaseConnection');

const route = express.Router();

//For uploading videos into channel
route.post('/upload', (req, res) => {
    if(req.files == null)
    {
        res.status(400);
        res.send("No files Found");
    } 

    else
    {
       let file = req.files.vfile;
       console.log(file);
       let fileName = file.name;

       const path = `D:/React/yt_clone/public/uploads/${fileName}`; 
       file.mv(path, (err) => {
            if(err)
            {
                res.send("File already Present");
            }   

            else{
                res.send(path);
            }
       });
       }
     }
)

route.post(("/updateDb"), (req,res) => {
    let Cno = parseInt(req.body.Cno);
    let Sno = parseInt(req.body.Sno);
    let vname = req.body.vname;
    let desc = req.body.desc;
    let type = req.body.vtype;
    let date = req.body.date;
    let path = req.body.vpath;

    let q = `insert into uploads values(null, "${vname}", ${Sno}, ${Cno}, "${desc}", "${type}", "${path}", '0', '0', "${date}")`;

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
            }
        })
    }

    catch(err)
    {
        console.log("Errror While inserting Videos --- "+err);
    }

    
})

module.exports = route;