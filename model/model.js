
var ncon = require('./controller/user') ;
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

ncon(mySchema) ;
ncon(Todo) ;

