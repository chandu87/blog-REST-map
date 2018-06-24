const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//Set View engine
app.set('view engine',"ejs");
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/blog_app");
// app.use("static","publc")


app.listen(3000, function(){
    console.log("Server Started : 3000");
});
