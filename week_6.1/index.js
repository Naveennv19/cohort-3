const express = require('express');
const app = express();

app.use(express.json());

let users =[]

app.post("/signup", (req, res) => {
    const user_name = req.body.username;
    const pass = req.body.password;

    users.push({
        user_name,
        pass
    })
    res.send({
        message: "You have signed up"
    })
});


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



app.post("/signin", (req, res) => {
    const user_name = req.body.username;
    const pass = req.body.password;

    let userFound = null;

    for(let i=0;i<users.length;i++){
        if(users[i].user_name == user_name && users[i].pass == pass){
            userFound = users[i];
        }
    }


    if (userFound) {
        const token = generateToken();
        userFound.token = token;
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
    let userFound = null;

    for(let i=0;i<users.length;i++){
        if(users[i].token == token){
            userFound = users[i];
        }
    }


    if (userFound) {
        res.json({
            username: userFound.user_name,
            password: userFound.pass
        })
        console.log(users);
    } else {
        res.json({
            message: "invalid token"
        })
    }
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});