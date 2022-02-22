require('dotenv').config();
const jwt = require('jsonwebtoken');

//TODO: CREATING TOKEN
function GenerateToken(user)
{
    return(jwt.sign({email: user.email}, process.env.SECRET_KEY, {expiresIn: '15s'}));
}

module.exports = GenerateToken;