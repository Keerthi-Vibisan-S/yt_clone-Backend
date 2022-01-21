const express = require('express');
const con = require('../settings/dataBaseConnection');

const route = express.Router();

//For uploading videos into channel
route.post('/upload', (req, res) => {
    if(req.files == null)
    {
        return res.status(400).json({ msg: 'No file uploaded' });
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
                console.error(err);
                return res.status(500).send(err);
            }  
            res.send(path);
       });
       }
     }
)

route.post(("/updateDb"), (req,res) => {

    console.log(req.body);
    let Cno = parseInt(req.body.data.Cno);
    let Sno = parseInt(req.body.data.Sno);
    let vname = req.body.data.vname;
    let desc = req.body.data.desc;
    let type = req.body.data.vtype;
    let date = req.body.data.date;
    let path = req.body.path;

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