var express = require("express");
var constants = require("./config/constant.js");
var bodyParser = require('body-parser');
// var apiRoutes = require("./modules/index.js");

var app = express();

//TODO - Add cors

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require("./modules/index.js")(app);

app.listen(constants.HTTP_PORT, ()=>{
    console.log(`Server running on port ${constants.HTTP_PORT}`);
})

app.get("/",(req,res,next)=>{
    res.json({"message":"ok!"});
});
