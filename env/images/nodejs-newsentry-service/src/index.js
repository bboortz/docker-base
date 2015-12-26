
/*** express setup ***/
// call the packages we need
var express    = require('express');        // call express
var bodyParser = require('body-parser');
var app        = express();                 // define our app using express

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port



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



/*** express routes for our api ***/
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('someone is using the api.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'this is the newsfeed api' });   
});

// on routes that end in /feedentry
router.route('/feedentry')

    // create a feed (accessed at POST http://localhost:8080/api/feedentry)
    .post(function(req, res) {

	console.log(req.body);
        
        var feedEntry = new FeedEntry();
        feedEntry.feed = req.body.feed;
        feedEntry.title = req.body.title;
        feedEntry.url = req.body.url;
        feedEntry.description = req.body.description;
        feedEntry.pubdate = req.body.pubdate;

        // save the feed and check for errors
        feedEntry.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Feed created!' });
        });
        
    })

	// get all the feeds (accessed at GET http://localhost:8080/api/feedentry)
	.get(function(req, res) {
		FeedEntry.find(function(err, feedentries) {
			if (err) {
				res.send(err);
			}
		
		res.json(feedentries);
		});
	});


// on routes that end in /feedentry/:feed_id
router.route('/feedentry/:entry_id')

	// get the feed with that id (accessed at GET http://localhost:8080/api/feedentry/:entry_id)
		.get(function(req, res) {
			FeedEntry.findById(req.params.enty_id, function(err, entry) {
			if (err) {
				res.send(err);
			}

			res.json(entry);
		});
	});


// REGISTER OUR ROUTES 
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

