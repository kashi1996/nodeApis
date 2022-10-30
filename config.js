const sql = require("mysql");

const con=sql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB
});
con.connect((err)=>{
    if(err){
        console.warn("error is connection");
    }
});
module.exports =  con;

