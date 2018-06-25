const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Set View engine
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost/blog_app");
app.use(express.static("public"));

//Mongoose model and config
const blogSchema = new mongoose.Schema({
  name: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});

let Blog = mongoose.model("Blog", blogSchema);
    
// Blog.create({
//     name: "Roasted MIX",
//     image: "https://images.unsplash.com/photo-1529381301888-8856b2080591?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4f0c326b2d490bd5d9eebb4b970f731f&auto=format&fit=crop&w=3144&q=80",
//     body: "Wonderful roasted almonds. Dry roasting with sea salt",
//     created: Date.now()
// });

//RESTFUL ROUTES
app.get("/", function(req, res) {
  res.redirect("/blogs");
});
app.get("/blogs", function(req, res) {
  Blog.find({}, function(err, data) {
    if (err) {
      console.log("There is Some error in Finding blogs data", err);
    } else {
      res.render("blogs.ejs",{blogs : data});
    }
  });
});

app.listen(3000, function() {
  console.log("Server Started : 3000");
});
