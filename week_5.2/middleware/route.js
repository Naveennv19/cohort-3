const express = require("express");
const app = express();


function logrequest(req,res,next){
    console.log(`Request made to:${req.url}`)
    next();
}

app.get('/special', logrequest, (req, res) => {
    res.send('This route uses route-specific middleware!');
  });

app.get("/sum",function(req,res){
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);

    res.json({
        ans: a + b
    });

})


app.listen(3000);


