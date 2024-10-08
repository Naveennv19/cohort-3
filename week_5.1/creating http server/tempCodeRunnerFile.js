const express = require("express");
const app = express();

app.get("/sum/:a/:b", function(req, res) {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);

    res.json({
        ans: a + b
    })
});

app.get("/multi/:a/:b", function(req, res) {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.json({
        ans: a * b
    })
});

app.get("/div/:a/:b", function(req, res) {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.json({
        ans: a / b
    })

});

app.get("/sub/:a/:b", function(req, res) {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.json({
        ans: a - b
    })
});

app.listen(3000);