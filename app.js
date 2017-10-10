//to require express modle
var express = require('express') ;
//to require mongoose object database
var mongoose=require('mongoose');
//to require to get whole body requested data from user
var bodyParser=require('body-parser');
//to connect with controller ./is controller directory and user is name of controller
var controller=require('./controller/user');
//to create app object with express
var app = express() ;
//to get a directory path
var path=require('path');
//by under method we get form or we will get data from other pages
var encodedeParser=bodyParser.urlencoded({extended:false});
//this is venky is url like 3000/venky
app.get("/venky",function(req,res) {

	res.send("hello");
});
//we can redirect a page with sendFile method also
app.get("/noo",function(req,res) {

	res.sendFile(path.join(__dirname, './views', 'addfile.html'));
});
//to work with ejs file rther than html we hv to set view engine vth ejs
app.set('view engine','ejs');
//we are sending alll these information to controller
controller(app);
//to listen an app port number is 3000
app.listen(3000);

