var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FeedSchema   = new Schema({
	name: { type: String, index: { unique: true }, required: true },
	url: { type: String, required: true }
});

module.exports = mongoose.model('Feed', FeedSchema);
