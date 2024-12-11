const express = require("express");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "randomThingKey@121";
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://naveennv:Nv1914@cluster0.lgtefyj.mongodb.net/todos-naveen2121")


const app = express();
app.use(express.json());

app.post("/signup", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    await UserModel.create({
        email: email,
        password: password,
        name: name
    });
    
    res.json({
        message: "You are signed up"
    })
});

app.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email: email,
        password: password,
    });
    
    if (user) {
        const token = jwt.sign({
            id: user._id.toString()
        },JWT_SECRET)

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
});

function auth(req, res, next) {
    const tokensent = req.headers.token;

    const decoded = jwt.verify(tokensent, JWT_SECRET);

    if (decoded) {
        req.userId = decoded.id;
        next();
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
    console.log(decode)
}


app.post("/todo",auth,async function(req, res) {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        userId:userId,
        title:title,
        done:done
    })

    res.json({
        userId:userId
    })
});





app.get("/myTodo",auth,async function(req, res) {
    const userId = req.userId;

    const my_todo = await TodoModel.findOne({
        userId
    })

    res.json({
        myTodo:my_todo
        
    })


    
});



app.listen(3000);