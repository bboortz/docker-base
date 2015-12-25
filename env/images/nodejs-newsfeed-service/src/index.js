
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



/*** mongodb ***/
var mongoose = require('mongoose');		// 
var uriUtil = require('mongodb-uri');

// error handler
function mongoErrHandler() {
	console.error.bind(console, 'connection error:');  
}

// mongoose connection setup 
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 3000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 3000 } } };       
var mongodbUri = 'mongodb://mongodb:27017/newsfeed';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connection.on('error', mongoErrHandler);
mongoose.connect(mongooseUri, options);
var conn = mongoose.connection;    

conn.on('error', mongoErrHandler);
conn.once('open', function() {
	console.log("mongodb connection established."
});



/*** feed model ***/
var Feed     = require('./app/models/feed');



/*** express routes for our api ***/
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'this is the newsfeed api' });   
});

// on routes that end in /feeds
router.route('/feeds')

    // create a feed (accessed at POST http://localhost:8080/api/feeds)
    .post(function(req, res) {
        
        var feed = new Feed();      // create a new instance of the Feed model
        feed.name = req.body.name;  // set the feeds name (comes from the request)
        feed.url = req.body.url;  // set the feeds name (comes from the request)

        // save the feed and check for errors
        feed.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Feed created!' });
        });
        
    })

	// get all the feeds (accessed at GET http://localhost:8080/api/feeds)
	.get(function(req, res) {
		Feed.find(function(err, feeds) {
			if (err) {
				res.send(err);
			}
		
		res.json(feeds);
		});
	});


// on routes that end in /feeds/:feed_id
router.route('/feeds/:feed_id')

	// get the feed with that id (accessed at GET http://localhost:8080/api/feeds/:feed_id)
		.get(function(req, res) {
			Feed.findById(req.params.feed_id, function(err, feed) {
			if (err) {
				res.send(err);
			}

			res.json(feed);
		});
	});


// REGISTER OUR ROUTES 
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

