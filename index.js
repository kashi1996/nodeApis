const express = require("express");
require("dotenv").config();
const con = require("./config");
const dbcon = require("./config");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());
app.get("/get",  ensureToken, (req, resp) => {
    dbcon.query("SELECT * FROM login", (err, result) => {
        if (err) {
            resp.send("ERROR");
        }
        else {
            resp.send(result);
        }

    });
});
// INSERT INTO `login` (`id`, `name`, `password`) VALUES (NULL, 'nameer', '321')

app.post("/post", (req, resp) => {
    const data = req.body;
    dbcon.query("INSERT INTO login SET ?", data, (err, result,fields) => {
        if (err) {
            resp.send("ERROR");
        }
        else {
            const token = jwt.sign({ data }, 'my_secret_key');
            // resp.send(result);
            resp.json({
                token: token
            })
        }

    });
});
function ensureToken(req, resp,next){
    const bearerHeader=req.headers["authorization"];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        resp.sendStatus(403);
    }
}
app.put("/:id", (req, resp)=>{
    const data = [req.body.name, req.body.password, req.params.id];
    con.query("UPDATE login SET name = ?, password = ? WHERE id = ?", data, (err, result, fields)=>{
        if(err){
            console.log(err);
        }
        else{
            resp.send(result);
        }
    });
})
app.delete("/:id", (req, resp) => {
    dbcon.query("DELETE from login where id = "+req.params.id, (err, result) => {
        if (err) {
            resp.send("ERROR");
        }
        else {
            resp.send(result);
        }

    });
});
app.listen(process.env.APP_PORT, ()=>{
    console.log("Listening on port: " , process.env.APP_PORT);
});