// require('dotenv').config();
// const jwt = require('jsonwebtoken');

// //! JWT verifying middleware
// function verifyToken(req, res, next)
// {
//     const bearerToken = req.headers.authorization;
//     const token = bearerToken && bearerToken.split(' ')[1];

//     if(token==null)
//     {
//         res.sendStatus(401);
//     }

//     else
//     {
//         jwt.verify(token, process.env.SECRET_KEY, (err, value) => {
//             if(err)
//             {
//                console.log(err);
//                res.sendStatus(403);
//             }

//             else
//             {
//                 console.log("----- JWT Authentication -----");
//                 console.log(value);
//                 next();
//             }
//         })
//     }
// }

// module.exports = verifyToken();