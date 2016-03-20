
/*** express setup ***/
// call the packages we need
var express    = require('express');        // call express
var bodyParser = require('body-parser');
var app        = express();                 // define our app using express

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
//app.use(methodOverride('X-HTTP-Method-Override')); 
app.use(express.static(__dirname + '/public')); 

var port = process.env.PORT || 8082;        // set our port



/*** mongodb setup ***/
var mongoose = require('mongoose');		// 
var uriUtil = require('mongodb-uri');

// error handler
function mongoErrHandler() {
	console.error.bind(console, 'connection error:');  
}

// mongoose connection setup 
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 3000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 3000 } } };       
var mongodbUri = 'mongodb://mongodb:27017/feedentry';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connection.on('error', mongoErrHandler);
mongoose.connect(mongooseUri, options);
var conn = mongoose.connection;    

conn.on('error', mongoErrHandler);
conn.once('open', function() {
	console.log("mongodb connection established.");
});



/*** feed model ***/
var FeedEntry     = require('./app/models/feedentry');


/*** handle all requests ***/
app.get('*', function(req, res) {
	console.log('someone is using the api.');
	res.sendfile('./public/index.html'); // load our public/index.html file
});



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

