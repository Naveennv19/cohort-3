const express = require('express');
const app = express();

app.use(express.json());

const users = [];
const todos = [];

app.post('/signup',function(request,response){
    const user_name_up = request.body.username;
    const pass_up = request.body.password;

    users.push({
        user_name_up,
        pass_up
    })
    response.send("signup successfull");

})

function generateToken() {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let token = "";
    for (let i = 0; i < 32; i++) {

        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}

let userFound = null;

app.post('/signin',function(request,response){
    const user_name_in = request.body.username;
    const pass_in = request.body.password;

    for(let i = 0; i < users.length; i++){
        if(users[i].user_name_up == user_name_in && users[i].pass_up == pass_in){
            userFound = users[i]
        }
    }

    if(userFound){
        const genToken = generateToken();
        userFound.token = genToken;
        response.send({
            genToken
        })
        console.log(users);
    }
    else{
        response.status(403).send({
            message: "Invalid username or password"
        })
    }
})

app.get('/me',function(request,response){
    const Token = request.headers.token;
    let userFound = null;

    for(let i = 0; i < users.length; i++){
        if(users[i].token == Token){
            userFound = users[i]
        }
    }
    if(userFound){
        response.json({
            username: userFound.user_name_up,
            password: userFound.pass_up
        })
        console.log(users);
    }
    else {
        response.json({
            message: "invalid token"
        })
    }
})

app.post("/todo",auth, function(req, res) {
    // 1. req should email or password or anything that will generate
    // 2. find out who is that user to get his name,
    // from req 

});


app.get("/todos",auth, function(req, res) {

});



app.listen(3000,()=>{
    console.log("Server is live on " + "http://localhost:3000")
})
