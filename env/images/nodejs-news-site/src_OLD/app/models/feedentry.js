var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FeedEntrySchema   = new Schema({
	feed: { type: String, required: true },
	title: { type: String, required: true },
	url: { type: String, required: true },
	pubdate: { type: String, required: false },
	description: { type: String, required: false}
});
FeedEntrySchema.index({ feed: 1, title: 1, url: 1 }, { unique: true });

module.exports = mongoose.model('FeedEntry', FeedEntrySchema);
