
const express=require("express");
const bodyParser= require("body-Parser");

const mongoose = require("mongoose");


const app=express();

app.set('view engine','ejs');

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://shashu:root77@connectbyapp.zubynz3.mongodb.net/diarydb");




var aTitle ="";
var aDes="";




const blogSchema= {
	topic:String,
	info:String
};


const Blog =mongoose.model("Blog",blogSchema);
module.exports =Blog;



app.get("/", function(req, res){

	
	Blog.find({}, function(err,posts){
		if(err)throw err;
		
		res.render("home",{ posts:posts});
		
	});
	

	
  });



app.get("/compose", function(req, res){
	res.render("compose");

  });

  app.post("/compose",function(req,res){
	aTitle = req.body.Topic;
	aDes =  req.body.Des;
	const pblog = new Blog({topic:req.body.Topic
		,info:req.body.Des});
	pblog.save(function(err){
		if (!err){
			res.redirect("/");
		}
	  });
	  console.log(req.body.Topic);
 });




 app.get("/about", function(req, res){
	res.render("about");
  });
  
  app.get("/home", function(req, res){
	res.redirect("/home");
  });

//   let port=process.env.PORT;
//   if(port ==null || port ==""){
// 	port=3000;
//   }
 
app.listen(3000,function(){
	console.log("server is running on port 3000");
});