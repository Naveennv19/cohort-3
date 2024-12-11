const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');

const jwt_key = 'forMyTodo123';
const app = express();

app.use(express.json());

const users = [];

function logger(request, response, next){
    console.log(request.method + "request come....")
    next();
}

app.get("/", function(request, response) {
    // response.sendFile(__dirname + '/public/index.html');
    response.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post('/signup',logger,function(request,response){
    const username_up = request.body.username;
    const pass_up = request.body.password;

    users.push({
        username_up,
        pass_up
    })
    response.json({
        message: "You are signed in"
    })
})

app.post('/signin',function(request,response){
    const username_in = request.body.username;
    const pass_in = request.body.password;

    let userFound = null;

    for(let i = 0; i< users.length; i++){
        if(users[i].username_up == username_in && users[i].pass_up == pass_in){
            userFound = users[i];
        }
    }

    if(userFound){
        const genToken = jwt.sign({
            username:username_in
        },jwt_key);

        response.send({
            token:genToken
        })
        console.log(users);
    }
    else {
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
})
function auth(request, response, next){
    const check_token = request.headers.token;
    const decode = jwt.verify(check_token,jwt_key);
    console.log(decode);
    if(decode.username){
        request.username_me= decode.username;
        next();
    }
    else {
        response.json({
            message: "You are not logged in"
        })
    }
}

app.get('/me',logger,auth,function(request,response){
   
    // const username_me = decode.username;
    const currentUser = request.username_me;

    let userFound = null;

    for(let i = 0;i < users.length; i++){
        if(users[i].username_up == currentUser){
            userFound = users[i]
        }
    }

    if (userFound) {
        response.send({
            username: userFound.username_up,
            password:userFound.pass_up
        })
    } else {
        response.status(401).send({
            message: "token invalid"
        })
    }

})

app.listen(3000,()=>{
    console.log('server is live on: ' + "http://localhost:3000")
})