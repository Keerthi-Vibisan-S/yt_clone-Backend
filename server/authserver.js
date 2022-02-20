const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

//! Google Authentication
const {OAuth2Client} = require('google-auth-library');
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
        console.log(payload);
      }
      verify().then(() => {
        res.json(user);
        res.end();
      })
      .catch(console.error);
})

app.listen(2023, () => {
    console.log("Auth Server Started");
    console.log("Listening on 2023");
})