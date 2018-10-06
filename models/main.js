var mongoose = require('mongoose'),
		mongooseLocale = require('mongoose-locale'),
		mongooseBcrypt = require('mongoose-bcrypt'),
		Schema = mongoose.Schema;

var userSchema = new Schema({
	login: String,
	password: String,
	email: String,
	status: { type: String, default: 'User' },
	date: { type: Date, default: Date.now },
});

var subsidiarySchema = new Schema({
	title: { type: String, trim: true, locale: true },
	adress: { type: String, trim: true, locale: true },
	date: { type: Date, default: Date.now }
});

var eventSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	description: { type: String, trim: true, locale: true },
	subsidiary: { type: Schema.Types.ObjectId, ref: 'Subsidiary' },
	inTrash: String,
	status: String,
	type: String,
	videos: [{ type: String, trim: true }],
	images: [{
		description: { type: String, trim: true, locale: true },
		original: String,
		thumb: String
	}],
	date: { type: Date, default: Date.now }
});

var categorySchema = new Schema({
	title: { type: String, trim: true, locale: true },
	category: { type: Schema.Types.ObjectId, ref: 'Category' },
	status: String,
	date: {type: Date, default: Date.now}
});

var magazineSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	num: Number,
	url: { type: String, trim: true },
	path: {
		original: String,
		thumb: String
	},
	date: {type: Date, default: Date.now}
});

// ------------------------
// *** Plugins Block ***
// ------------------------


userSchema.plugin(mongooseBcrypt, { fields: ['password'] });
subsidiarySchema.plugin(mongooseLocale);
eventSchema.plugin(mongooseLocale);
categorySchema.plugin(mongooseLocale);
magazineSchema.plugin(mongooseLocale);

// ------------------------
// *** Index Block ***
// ------------------------

eventSchema.index({'title.value': 'text', 'description.value': 'text'}, {language_override:'lg', default_language: 'ru'});


// ------------------------
// *** Exports Block ***
// ------------------------


module.exports.User = mongoose.model('User', userSchema);

module.exports.Subsidiary = mongoose.model('Subsidiary', subsidiarySchema);
module.exports.Event = mongoose.model('Event', eventSchema);
module.exports.Category = mongoose.model('Category', categorySchema);
module.exports.Magazine = mongoose.model('Magazine', magazineSchema);
