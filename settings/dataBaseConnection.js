const mysql = require('mysql');

//Setting up Connection
var con = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'vibi1234',
    database: 'ytclone',
    charset : 'utf8mb4'
});

//Holding Connection
con.connect((err) => {
    if(err)
    {
        console.log(err);
    }

    else
    {
        console.log("Database Connected");
    }
});

module.exports = con;

