/*  1. have a users array
    2. create a signup route
        take username password and push to array
    3. create a signin route
       take username password and check if it exists in array
       if exists generate token and send back the token
    4. create /me route
        send the token and verify in jwt if its valid
        if valid send successful message with username */


const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "randomcode_maker2121";
const app = express();

app.use(express.json());

const users = [];

app.post("/signup",function(req ,res){
    const username_up = req.body.username;
    const password_up = req.body.password;

    users.push({
        username:username_up,
        password:password_up
    })
    res.json({
        message:"sign up sucessfull"
    })
})

app.post("/signin",function(req ,res){
    const username_in = req.body.username;
    const password_in = req.body.password;

    let userFound = null;

    for(let i = 0; i < users.length; i++){
        if(users[i].username == username_in && users[i].password == password_in){
            userFound = users[i];
        }
    }

    if(userFound){
        const genToken = jwt.sign({
            username:username_in
        },JWT_SECRET);

    res.send({
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
function auth(req,res,next){
    const check_token = req.headers.token;
    const decode = jwt.verify(check_token,JWT_SECRET)
    console.log("decode :"+decode)
    console.log("decode.username :" + decode.username)


    if(decode.username){
        req.username_me = decode.username;
        next();
    }
    else {
        response.json({
            message: "You are not logged in"
        })
    }
}

app.get("/me",auth,function(req,res){
    const currentUser = req.username;
    let userFound = null;

    for(let i = 0;i < users.length; i++){
        if(users[i].username_up == currentUser){
            userFound = users[i]
        }
    }
    if(userFound){
        res.send({
            username: userFound.username,
            password:userFound.password
        })
    } 
    else {
        res.status(401).send({
            message: "token invalid"
        })
    }})


app.listen(3000,()=>{
    console.log("Server is live on " + "http://localhost:3000")
})
