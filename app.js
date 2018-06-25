const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//Set View engine
app.set('view engine',"ejs");
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/blog_app");
app.use(express.static("public"));

const blogSchema = new mongoose.Schema({
        name: String,
        image: String,
        body: String,
        created: {type : Date, default : Date.now} 

});

let Blog = mongoose.model("Blog", blogSchema);

Blog.create({
    name: "Roasted MIX",
    image: "https://unsplash.com/photos/eY8sI1uqNuY",
    body: "Wonderful roasted almonds. Dry roasting with sea salt",
    created: Date.now()
});


app.get("/", function(req, res){
    res.send("Hello World!!");
});

app.listen(3000, function(){
    console.log("Server Started : 3000");
});
