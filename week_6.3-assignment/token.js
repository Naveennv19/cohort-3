/* 1. have a users array
2. create a signup route
    take username password and push to array
3. create a signin route
    take username password and check if it exists in array
    if exists generate token and send back the token
4. create /me route
    send the token and verify in jwt if its valid
    if valid send successful message with username */

const express = require("express");
const app = express();

app.use(express.json());

const users = [];

function generateToken() {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
    'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let token = "";
    for (let i = 0; i < 32; i++) {

        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}

app.post("/signup",function(req,res){
    const username_up = req.body.username;
    const password_up = req.body.password;

    users.push({
        username:username_up,
        password:password_up
    })

    res.send("signup successfull");
})

app.post("/signin",async function(req,res){
    const username_in = req.body.username;
    const password_in = req.body.password;

    let userFound = null;

    for(let i = 0; i < users.length; i++){
        if(users[i].username == username_in && users[i].password == password_in){
            userFound = users[i]
        }
    }

    if(userFound){
        const genToken = generateToken();
        userFound.token = genToken;

        res.json({
            token:genToken
        })
        console.log(users);

    }
    else{
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
})

app.get("/me",function(req,res){
    const token_me = req.headers.token;
    let userFound = null;
    for(let i = 0; i < users.length; i++){
        if(users[i].token == token_me){
            userFound = users[i]
        }
    }

    if(userFound){
        res.json({
            username: userFound.username,
            password:userFound.password
        })
        console.log(users);
    }
    else {
        res.json({
            message: "invalid token"
        })
    }
})

app.listen(3000,()=>{
    console.log("Server is live on " + "http://localhost:3000")
})