
const express=require("express");
const bodyParser= require("body-parser");

const mongoose = require("mongoose");


const app=express();
require('dotenv').config();
app.set('view engine','ejs');

app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("public"));

// const MONGO_DB=process.env.MONGO_DB;
mongoose.connect("mongodb+srv://shashu:"+ process.env.PASSWORD + "@connectbyapp.zubynz3.mongodb.net/DIARYdb");
const connection = mongoose.connection;
connection
	.once('open',()=>{
		console.log("mongo db is connected");
	})
	.on('error',(err)=>{
		console.log(err);
	})
console.log(process.env.PASSWORD);




var aTitle ="";
var aDes="";




const blogSchema= {
	topic:String,
	info:String
};


const Blog =mongoose.model("Blog",blogSchema);




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
			res.redirect("/home");
		}
	  });
	  
 });




 app.get("/about", function(req, res){
	res.render("about");
  });
  
  app.get("/home", function(req, res){
	res.redirect("/home");
  });


  app.listen(process.env.PORT || 3000, function(){
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
