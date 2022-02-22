require('dotenv').config();
const jwt = require('jsonwebtoken');

//! Refresh Token
function getRefreshToken(user)
{
    return(jwt.sign({email: user.email}, process.env.REFRESH_KEY));
}

module.exports = getRefreshToken;