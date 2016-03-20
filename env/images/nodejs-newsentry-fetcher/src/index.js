
/*** feed/parser setup ***/
// call the packages we need
var request = require('request')
  , FeedParser = require('feedparser')
  , Iconv = require('iconv').Iconv;



/*** settings ***/
var timeout = 5000;
var maxSockets = 100;
var count = 0;
var feedServiceUrl = 'http://nodejs-newsfeed-service:8080/api/feed';
var feedentryServiceUrl = 'http://nodejs-newsentry-service:8080/api/feedentry';



/*** function ***/

function postFeedEntry(feed, url, title, description, pubdate) {

	entryStr = { 'feed': feed, 'url': url, 'title': title, 'description': description, 'pubdate': pubdate };
//	console.log("--> " + feed + ": " + title);

	// Configure the request
	var options = {
		url: feedentryServiceUrl,
		method: 'POST',
		json: true,
		form: entryStr,
		timeout: timeout,
		pool: true,
		maxSockets: maxSockets
	}
 
	// Start the request
	request(options, function (error, response, body) {
	    if (error || response.statusCode != 200) {
		console.log("ERROR - on feed url <" + url + "> with http status code: " + response.statusCode);
	    }
	})

}

function fetch(feed, feedUrl) {

	// Set the headers
	var headers = {
		'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
		'accept':     'text/html,application/xhtml+xml'
	}
 
	// Configure the request
	var options = {
		url: feedUrl,
		method: 'GET',
		headers: headers,
		timeout: timeout,
		pool: true,
		maxSockets: maxSockets
	}
	var req = request(options);
 
	var feedparser = new FeedParser();

	// Define our handlers
	req.on('error', done);
	req.on('response', function(response) {
		if (response.statusCode != 200) return this.emit('error', new Error('Bad status code'));
		var charset = getParams(response.headers['content-type'] || '').charset;
		response = maybeTranslate(response, charset);
		// And boom goes the dynamite
		response.pipe(feedparser);
	});

	feedparser.on('error', done);
	feedparser.on('end', done);
	feedparser.on('readable', function() {
		var post;
		while (post = this.read()) {
			postFeedEntry(feed, post.link, post.title, post.description, post.pubdate);
		}
	});

}

function maybeTranslate (response, charset) {
	var iconv;
	// Use iconv if its not utf8 already.
	if (!iconv && charset && !/utf-*8/i.test(charset)) {
		try {
			iconv = new Iconv(charset, 'utf-8');
			console.log('Converting from charset %s to utf-8', charset);
			iconv.on('error', done);
			// If we're using iconv, stream will be the output of iconv
			// otherwise it will remain the output of request
			response = response.pipe(iconv);
		} catch(err) {
			response.emit('error', err);
		}
	}
	return response;
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
		console.log("ERROR:", err, err.stack);
	}
/*
	if (count == 0) {
		process.exit();
	}
*/
}



/*** fetch entries from feeds ***/
// Configure the request
var options = {
	url: feedServiceUrl,
	method: 'GET',
	json: true,
	timeout: timeout,
	pool: true,
	maxSockets: maxSockets
}

request(options, function (error, response, body) {
	console.log("error: " + error);
	if (!error && response.statusCode === 200) {
		count = Object.keys(body).length
		body.forEach(function(obj) { 
			console.log("fetch: " + obj.url); 
			fetch(obj.name, obj.url); 
		});
	} else if (!error && response.statusCode != 200) {
		console.log("ERROR - on feed url <" + feedServiceUrl + "> with http status code: " + response.statusCode);
	} else {
		console.log("ERROR - on feed url <" + feedServiceUrl + "> with error: " + error);
	}
})



setTimeout(function() {
	process.exit();
}, timeout * 4);



//  fetch('http://www.spiegel.de/schlagzeilen/tops/index.rss');
//  fetch('http://newsfeed.zeit.de/index');
//  fetch('https://blog.fefe.de/rss.xml');
//  fetch('http://localhost:' + this.address().port + '/iconv.xml');
