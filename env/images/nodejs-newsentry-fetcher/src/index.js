
/*** feed/parser setup ***/
// call the packages we need
var request = require('request')
  , FeedParser = require('feedparser')
  , Iconv = require('iconv').Iconv;



/*** mongodb setup ***/
var mongoose = require('mongoose');             //
var uriUtil = require('mongodb-uri');

// error handler
function mongoErrHandler() {
        console.error.bind(console, 'connection error:');
}

// mongoose connection setup
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 5000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 5000 } } };
var mongodbUri = 'mongodb://mongodb:27017/newsentry';
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







/*** function ***/
var count = 0;

function fetch(feed, feedUrl) {
  // Define our streams
 //  var req = request("url": feedUrl, "rejectUnauthorized": false, {timeout: 10000, pool: false});
  var req = request(feedUrl, {timeout: 5000, pool: true, maxSockets: 30 });
  req.setMaxListeners(50);
  // Some feeds do not respond without user-agent and accept headers.
  req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36')
  req.setHeader('accept', 'text/html,application/xhtml+xml');

  var feedparser = new FeedParser();

  // Define our handlers
  req.on('error', done);
  req.on('response', function(res) {
    if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
    var charset = getParams(res.headers['content-type'] || '').charset;
    res = maybeTranslate(res, charset);
    // And boom goes the dynamite
    res.pipe(feedparser);
  });

  feedparser.on('error', done);
  feedparser.on('end', done);
  feedparser.on('readable', function() {
    var post;
    while (post = this.read()) {
	console.log("--> " + feed + ": " + post.title);
//	console.log(JSON.stringify(post, ' ', 4));

	entryStr = { 'feed': feed, 'url': post.link, 'title': post.title, 'description': post.description, 'pubdate': post.pubdate };
	// entryStr = { 'feed': feed, 'url': post.link, 'title': 'huhu', 'description': 'lala', 'pubdate': post.pubdate };
	entryJson = JSON.stringify(entryStr);
	console.log(entryJson);

 
	// Set the headers
	var headers = {
	    'User-Agent':       'Super Agent/0.0.1',
//	    'Content-Type':     'application/x-www-form-urlencoded'
	    'Content-Type':     'application/json'
	}
 
	// Configure the request
	var options = {
	    url: 'http://nodejs-newsentry-service:8080/api/feedentry',
	    method: 'POST',
	    headers: headers,
	    form: entryStr,
		timeout: 5000,
		pool: true,
		maxSockets: 30
	}
 
	// Start the request
	request(options, function (error, response, body) {
	    if (error || response.statusCode != 200) {
		console.log("ERROR - http status code: " + res.statusCode);
	    }
	})

/*
	request({ url: "http://nodejs-newsentry-service:8080/api/feedentry", method: "POST", json: true, headers: { "content-type": "application/json" }, body: entryJson }, function(err, res, body) {
	if (err || res.statusCode != 200) {
		console.log("ERROR - http status code: " + res.statusCode);
	}
});
*/
		
/*
        var feedEntry = new FeedEntry();
        feedEntry.feed = feed; 
        feedEntry.title = post.title; 
        feedEntry.url = post.link; 
        feedEntry.description = post.description; 
        feedEntry.pubdate = post.pubdate; 

	console.log(feedEntry);

        feedEntry.save(function(err) {
		if (err) {
			console.error.bind(console, "cannot save feed entry: " + err);
		}
        });
*/


    }

  });
}

function maybeTranslate (res, charset) {
  var iconv;
  // Use iconv if its not utf8 already.
  if (!iconv && charset && !/utf-*8/i.test(charset)) {
    try {
      iconv = new Iconv(charset, 'utf-8');
      console.log('Converting from charset %s to utf-8', charset);
      iconv.on('error', done);
      // If we're using iconv, stream will be the output of iconv
      // otherwise it will remain the output of request
      res = res.pipe(iconv);
    } catch(err) {
      res.emit('error', err);
    }
  }
  return res;
}

function getParams(str) {
  var params = str.split(';').reduce(function (params, param) {
    var parts = param.split('=').map(function (part) { return part.trim(); });
    if (parts.length === 2) {
      params[parts[0]] = parts[1];
    }
    return params;
  }, {});
  return params;
}

function done(err) {
	count--;
	if (err) {
		console.log(err, err.stack);
	}
/*
	if (count == 0) {
		process.exit();
	}
*/
}



/*** fetch entries from feeds ***/
var request = require("request")
var url = "http://nodejs-newsfeed-service:8080/api/feed"

request( { url: url, json: true, timeout: 5000, pool: true, maxSockets: 30 }, function (error, response, body) {

    if (!error && response.statusCode === 200) {
	count = Object.keys(body).length
	body.forEach(function(obj) { 
		console.log("fetch: " + obj.url); 
		fetch(obj.name, obj.url); 
	});
    } else {
	console.log(error);
	console.log(response);
	}
})


setTimeout(function() {
	process.exit();
}, 20000);


//  fetch('http://www.spiegel.de/schlagzeilen/tops/index.rss');
//  fetch('http://newsfeed.zeit.de/index');
//  fetch('https://blog.fefe.de/rss.xml');
//  fetch('http://localhost:' + this.address().port + '/iconv.xml');
//});

