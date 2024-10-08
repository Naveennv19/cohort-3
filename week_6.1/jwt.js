const express = require('express');
const jwt = require('jsonwebtoken')

const JWT_SECRET = "randomtyping123"
const app = express();

app.use(express.json());

let users =[]

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username,
        password
    })
    res.send({
        message: "You have signed up"
    })
});


app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let userFound = null;

    for(let i=0;i<users.length;i++){
        if(users[i].username == username && users[i].password == password){
            userFound = users[i];
        }
    }


    if (userFound) {
        const token = jwt.sign({
            username:username
        },JWT_SECRET);

        res.send({
            token
        })
        console.log(users);
    } else {
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
});


app.get("/me", (req, res) => {
    const token = req.headers.token;
    const decode = jwt.verify(token,JWT_SECRET);
    const username = decode.username;


    let userFound = null;

    for(let i = 0;i < users.length; i++){
        if(users[i].username == username){
            userFound = users[i]
        }
    }
    if (userFound) {
        res.send({
            username: userFound.username,
            password:userFound.password
        })
    } else {
        res.status(401).send({
            message: "token invalid"
        })
    }
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});