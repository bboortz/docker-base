var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FeedEntrySchema   = new Schema({
	feed: { type: String, index: { unique: true }, required: true },
	title: { type: String, index: { unique: true }, required: true },
	url: { type: String, index: { unique: true }, required: true },
	pubdate: { type: String, index: { unique: true }, required: false },
	description: { type: String, required: false}
});

module.exports = mongoose.model('FeedEntry', FeedEntrySchema);
