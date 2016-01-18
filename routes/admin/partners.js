var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var del = require('del');
var async = require('async');
var gm = require('gm').subClass({ imageMagick: true });
var del = require('del');

var Partner = require('../../models/main.js').Partner;

var __appdir = path.dirname(require.main.filename);


// ------------------------
// *** Handlers Block ***
// ------------------------


var checkNested = function (obj, layers) {

	if (typeof layers == 'string') {
		layers = layers.split('.');
	}

	for (var i = 0; i < layers.length; i++) {
		if (!obj || !obj.hasOwnProperty(layers[i])) {
			return false;
		}
		obj = obj[layers[i]];
	}
	return true;
}


// ------------------------
// *** Admin Partners Block ***
// ------------------------


exports.list = function(req, res) {
	Partner.find().sort('num').exec(function(err, partners) {
		res.render('auth/partners/', {partners: partners});
	});
}


// ------------------------
// *** Add Partner Block ***
// ------------------------


exports.add = function(req, res) {
	res.render('auth/partners/add.jade');
}

exports.add_form = function(req, res) {
	var post = req.body;
	var files = req.files;

	var partner = new Partner();

	var locales = post.en ? ['ru', 'en'] : ['ru'];

	locales.forEach(function(locale) {

		checkNested(post, [locale, 'title'])
			&& partner.setPropertyLocalised('title', post[locale].title, locale);

		checkNested(post, [locale, 'position'])
			&& partner.setPropertyLocalised('position', post[locale].position, locale);

	});

	partner.num = post.num;
	partner.url = post.url;

	if (!files.image) {
		return (function () {
			partner.save(function(err, partner) {
				res.redirect('back');
			});
		})();
	}

	fs.mkdir(__appdir + '/public/images/partners/' + partner._id, function() {
		var newPath = __appdir + '/public/images/partners/' + partner._id;;
		gm(files.image.path).resize(1200, false).write(newPath + '/original.jpg', function() {
			gm(files.image.path).resize(400, false).write(newPath + '/thumb.jpg', function() {
				partner.path.original = '/images/partners/' + partner._id + '/logo.jpg';
				partner.path.thumb = '/images/partners/' + partner._id + '/thumb.jpg';
				partner.save(function() {
					res.redirect('/auth/partners');
				});
			});
		});
	});

}


// ------------------------
// *** Edit Partner Block ***
// ------------------------


exports.edit = function(req, res) {
	var id = req.params.id;

	Partner.findById(id).exec(function(err, partner) {
		res.render('auth/partners/edit.jade', {partner: partner});
	});
}

exports.edit_form = function(req, res) {
	var id = req.params.id;
	var post = req.body;
	var files = req.files;

	Partner.findById(id).exec(function(err, partner) {

		var locales = post.en ? ['ru', 'en'] : ['ru'];

		locales.forEach(function(locale) {

			checkNested(post, [locale, 'title'])
				&& partner.setPropertyLocalised('title', post[locale].title, locale);

			checkNested(post, [locale, 'position'])
				&& partner.setPropertyLocalised('position', post[locale].position, locale);
		});


		partner.num = post.num;
		partner.url = post.url;

		if (!files.image) {
			return (function () {
				partner.save(function(err, partner) {
					res.redirect('back');
				});
			})();
		}

		fs.mkdir(__appdir + '/public/images/partners/' + partner._id, function() {
			var newPath = __appdir + '/public/images/partners/' + partner._id;;
			gm(files.image.path).resize(1200, false).write(newPath + '/original.jpg', function() {
				gm(files.image.path).resize(400, false).write(newPath + '/thumb.jpg', function() {
					partner.path.original = '/images/partners/' + partner._id + '/logo.jpg';
					partner.path.thumb = '/images/partners/' + partner._id + '/thumb.jpg';
					partner.save(function() {
						res.redirect('/auth/partners');
					});
				});
			});
		});

	});
}


// ------------------------
// *** Remove Partner Block ***
// ------------------------


exports.remove = function(req, res) {
	var id = req.body.id;
	Partner.findByIdAndRemove(id, function() {
		del.sync(__appdir + '/public/images/partners/' + id);
		res.send('ok');
	});
}