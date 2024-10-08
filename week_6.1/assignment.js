const express = require("express");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "randomKey";

const app = express();
app.use(express.json());

const users = [];

function logger(req, res, next) {
    console.log(req.method + " request came");
    next();
}

// localhost:3000
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
})

app.post("/signup", logger, function(req, res) {
    const username = req.body.username
    const password = req.body.password
    users.push({
        username: username,
        password: password
    })


    res.json({
        message: "You are signed in"
    })
})

app.post("/signin", logger, function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    let userFound = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            userFound = users[i]
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
})

function auth(req, res, next) {
    const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_SECRET);

    if (decodedData.username) {
        // req = {status, headers...., username, password, userFirstName, random; ":123123"}
        req.username = decodedData.username
        next()
    } else {
        res.json({
            message: "You are not logged in"
        })
    }
}

app.get("/me", logger, auth, function(req, res) {
    const currentUser = req.username;
    let userFound = null;


    for (let i = 0; i < users.length; i++) {
        if (users[i].username === currentUser) {
            userFound = users[i];
            break;
        }
    }
    if(userFound){
        res.json({
            username: userFound.username,
            password: userFound.password
        })
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
        
})





app.listen(3000,() =>{
    console.log("Server running on port 3000");
});