const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOveride = require("method-override");

//Set View engine
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost/blog_app");
app.use(express.static("public"));
app.use(methodOveride("_method"));

//Mongoose model and config
const blogSchema = new mongoose.Schema({
  title: String,
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

//INDEX ROUTE
app.get("/", function(req, res) {
  res.redirect("/blogs");
});
app.get("/blogs", function(req, res) {
  Blog.find({}, function(err, data) {
    if (err) {
      console.log("There is Some error in Finding blogs data", err);
    } else {
      res.render("blogs",{blogs : data});
    }
  });
});

//NEW ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new");
});

//CREATE ROUTE
app.post("/blogs", function(req, res){
        Blog.create(req.body.blog, function(err, data){
            if(err){
                res.render("new");
            }else{
                res.redirect("/blogs");
            }
        });
});

//SHOW ROUTE

app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, data){
        if(err){
            console.log(err);
        }else{
            res.render("show", {blogData : data});
        }
    });
});
//Edit ROUTE
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs")        
        }else{
              res.render("edit", {blog : foundBlog});
        }
    });
});
//PUT Route
app.put("/blogs/:id", function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, data){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/"+req.params.id);
        }
    });
});

//DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err, resRemove){
        if(err){
            res.redirect("/blogs/"+ req.params.id);
        }
        else{
            res.redirect("/blogs");
        }
    });

});

app.listen(3000, function() {
  console.log("Server Started : 3000");
});
