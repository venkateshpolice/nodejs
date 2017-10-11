var mongoose=require('mongoose');
var bodyParser=require('body-parser');

mongoose.connect('mongodb://test:test@ds113825.mlab.com:13825/vennkateshdata');
//create a schema

var mySchema=new mongoose.Schema({
	fname:String,
	lname:String

});
var Todo =mongoose.model('Todo',mySchema);


var encodedeParser=bodyParser.urlencoded({extended:false});

//to get a controller information from app.js
module.exports = function(app)
{

			app.get('/',function(req,res)
			{
				
				//to get a data from mongodb
				Todo.find({},function(err,data)
				   {
				   		if(err) throw err;
				   		res.render('mongo',{data:data});
				   });
			});	
				
			app.get('/add',function(req,res)
			{
				//the render also redirect a page
				res.render('myejs');
			});
			// when we submit myejs file the post method will got info
			app.post('/submited',encodedeParser,function(req,res)
			{
				//console.log(req.query);
				//rewq.body is a method to get whole info of body with name attribute
				console.log(req.body);
				//sending data with the page
				var fn=req.body.fname;
				var ln=req.body.lname;
				var itemOne=Todo({fname:fn,lname:ln}).save(function(err)
					{
						if(err) throw err;
						console.log("inserted");
						});

						res.render('success',{data:req.body});
					});
			app.get('/read',function(req,res)
			{
				console.log("error");
				//to get a data from mongodb
				Todo.find({},function(err,data)
				   {
				   		if(err) throw err;
				   		res.render('mongo',{data:data});
				   });
			});
			app.get('/delete/:id',function(req,res)
			{
				mongoose.model("Todo").remove({_id:req.params.id},function(err,delData)
				{
					res.send("deleted successfully");
					});
			});

			app.get('/edit/:id',function(req,res)
			{
				Todo.find({'_id':req.params.id},function(err,data)
				   {
				   		if(err) throw err;
				   		res.render('edit',{data:data});
				   });
			});

			app.post('/edited/:id',encodedeParser,function(req,res)
			{
				//console.log(req.query);
				//rewq.body is a method to get whole info of body with name attribute
				//onsole.log(req.body);
				//sending data with the page
				mongoose.model("Todo").remove({_id:req.params.id},function(err,delData)
				{
					//res.send("deleted successfully");
				});

				var fn=req.body.fname;
				var ln=req.body.lname;

				var itemOne=Todo({fname:fn,lname:ln}).save(function(err)
					{
						if(err) throw err;
						res.send("edited data");
						});

						//res.render('success',{data:req.body});
			});
			app.get('/login',function(req,res)
			{
				//the render also redirect a page
				res.render('login');
			});
			app.post('/logindetails',encodedeParser,function(req,res)
			{
				var fn=req.body.fname;
				var ln=req.body.lname;

					Todo.find({fname:fn,lname:ln},function(err,data)
					 {
					 
						if(data.length === 0)
						{
							console.log("notexistdatabase");
						}
						else
						{
                            console.log("ur logged successfully");
							res.send("ur logged successfully");
						}
					});
				});
				
			
		
}
