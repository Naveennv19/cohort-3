const express = require("express");
const app = express();

let requestCount = 0;

// Middleware to increase request count
function requestIncreaser(req, res, next){
    requestCount = requestCount + 1; 
    req.name = "Mr_unknown";
    console.log("Total number of requests: " + requestCount);
    next();
}

function sumHandler(req, res) {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    console.log(req.name)

    res.json({
        ans: a + b
    });
}

app.get("/sum", requestIncreaser, sumHandler);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
