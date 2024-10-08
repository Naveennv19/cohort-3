const express = require("express");
const app = express();

let requestCount = 0;

function requestIncreaser(req,res,next){
    requestCount = requestCount + 1; 
    console.log("total no of request:" + requestCount );
    res.json({
        message:"i have ended the request..."
    })
}


function sumHandler(req,res){
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);

    res.json({
        ans: a + b
    });
}
    




app.get("/sum",requestIncreaser,sumHandler);

app.listen(3000);