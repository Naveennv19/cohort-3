const express = require("express");
const jwt = require("jsonwebtoken");
const {userData , todoData} = require("./db");
const JWT_SECRET = "trying90diffok";
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { use } = require("bcrypt/promises");

mongoose.connect("mongodb+srv://naveennv:Nv1914@cluster0.lgtefyj.mongodb.net/todo-app-1")

const app = express();
app.use(express.json());

app.post("/signup",async function(req,res){
    const name = req.body.name;
    const username_up = req.body.username;
    const password_up = req.body.password;

    console.log(name, username_up, password_up);

    const hashPass = await bcrypt.hash(password_up, 5);
    console.log(hashPass);

    const mongo_res = await userData.create({
        username : username_up,
        password : hashPass,
        name : name
    })

    console.log("mongo_res: ", mongo_res)
    // console.log(userData)
    res.json({
        message : "sign up sucessfull"
    })
})

app.post("/signin",async function(req,res){
    const username_in = req.body.username;
    const password_in = req.body.password;

    const user = await userData.findOne({
        username : username_in
    });
    console.log(user);

    const check_pass = await bcrypt.compare(password_in,user.password);

    if(check_pass){
        const token = jwt.sign({
            id : user._id.toString()
        },JWT_SECRET)
        res.json({
            token : token
        })
    } 
    else{
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
})

function auth(req,res,next){
    const TokenSent = req.headers.token;
    const decodeToken = jwt.verify(TokenSent,JWT_SECRET);
    console.log(decodeToken)

    if(decodeToken){
        req.userId = decodeToken.id;
        next();
    }
    else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
}

app.post("/todo",auth,async function(req,res){
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await todoData.create({
        userId : userId,
        title : title,
        done : done
    })
    res.json({
        userId:userId
    })
})

app.get("mytodos",auth ,async function(req,res){
    const userId = req.userId;

    const my_todo = await todoData.findOne({
        userId
    })
    res.json({
        myTodo:my_todo
    })
})

app.listen(3001, ()=>{
    console.log("server is live : " + "http://localhost:3001")
})
    