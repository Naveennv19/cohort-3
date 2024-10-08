const express = require("express");
const app = express();

let requestCount = 0;

// Middleware to increase request count
function requestIncreaser(req, res, next) {
    requestCount = requestCount + 1; 
    console.log("Total number of requests: " + requestCount);
    next();
}

// Handler to sum two numbers
function sumHandler(req, res) {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);

    res.json({
        ans: a + b
    });
}

// Route expecting parameters 'a' and 'b'
app.get("/sum", requestIncreaser, sumHandler);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
