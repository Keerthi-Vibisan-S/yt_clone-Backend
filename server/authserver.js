require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const con = require('../settings/dataBaseConnection');

//! Google Authentication
const {OAuth2Client} = require('google-auth-library');
const { isFunc } = require('express-fileupload/lib/utilities');
const CLIENT_ID = '852762241490-gr45nghc45rkvjp5bs3uqvr4q0qkp80h.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("This is authentication Server SECURED");
    res.end();
})

app.post("/getToken", (req, res) => {
    const token = req.body.token;
    const email = req.body.email;
    console.log(token);
    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        user.email = payload.email;
        user.emailVerify = payload.email_verified;
      }
      verify().then(() => {
        if(user.email == email)
        {
            CheckPresent(res, email);
        }
      })
      .catch(console.error);
})

//?Checking Database for the present user

function CheckPresent(res, email)
{
    let q = `select * from users where email = "${email}"`;
    let data;
    con.query(q, (err, result) => {
        if(err)
        {
            console.log(err);
            return("");
        }

        else
        {
            console.log("-------- WE got Result --------");
            console.log(result);
            if(result.length == 0)
            {
                //! Register
                console.log("No data Register");
            }

            else
            {
                GenerateToken(res, email);
            }
        }
    })
}

//TODO: CREATING TOKEN
function GenerateToken(res, email)
{
    const token = jwt.sign({email: email}, process.env.SECRET_KEY);
    console.log("Generated Token --- "+token);
    res.json(token);
    res.end();
}



app.listen(2023, () => {
    console.log("Auth Server Started");
    console.log("Listening on 2023");
})