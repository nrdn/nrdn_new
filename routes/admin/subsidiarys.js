var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var del = require('del');
var async = require('async');
var gm = require('gm').subClass({ imageMagick: true });
var del = require('del');

var Subsidiary = require('../../models/main.js').Subsidiary;
var Event = require('../../models/main.js').Event;
var Hall = require('../../models/main.js').Hall;

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
// *** Admin Subsidiarys Block ***
// ------------------------


exports.list = function(req, res) {
	Subsidiary.find().sort('-date').exec(function(err, subsidiarys) {
		res.render('auth/subsidiarys/', {subsidiarys: subsidiarys});
	});
}


// ------------------------
// *** Add Subsidiarys Block ***
// ------------------------


exports.add = function(req, res) {
	res.render('auth/subsidiarys/add.jade');
}

exports.add_form = function(req, res) {
	var post = req.body;
	var files = req.files;
	var images = [];

	var subsidiary = new Subsidiary();

	var locales = post.en ? ['ru', 'en'] : ['ru'];

	locales.forEach(function(locale) {
		checkNested(post, [locale, 'title'])
			&& subsidiary.setPropertyLocalised('title', post[locale].title, locale);

		checkNested(post, [locale, 'adress'])
			&& subsidiary.setPropertyLocalised('adress', post[locale].adress, locale);

	});

	subsidiary.status = post.status;


		subsidiary.save(function() {
			res.redirect('/auth/subsidiarys');
		});


}


// ------------------------
// *** Edit Subsidiarys Block ***
// ------------------------


exports.edit = function(req, res) {
	var id = req.params.id;
	var public_path = __appdir + '/public';
	var images_preview = [];

	Subsidiary.findById(id).exec(function(err, subsidiary) {
			res.render('auth/subsidiarys/edit.jade', {images_preview: images_preview, subsidiary: subsidiary});
		});
}

exports.edit_form = function(req, res) {
	var post = req.body;
	var files = req.files;
	var id = req.params.id;
	var images = [];

	Subsidiary.findById(id).exec(function(err, subsidiary) {

		var locales = post.en ? ['ru', 'en'] : ['ru'];

		locales.forEach(function(locale) {
			checkNested(post, [locale, 'title'])
				&& subsidiary.setPropertyLocalised('title', post[locale].title, locale);

			checkNested(post, [locale, 'adress'])
				&& subsidiary.setPropertyLocalised('adress', post[locale].adress, locale);
		});
		subsidiary.status = post.status;
			subsidiary.save(function() {
				res.redirect('back');
			})
	});
}


// ------------------------
// *** Remove Subsidiarys Block ***
// ------------------------


exports.remove = function(req, res) {
	var id = req.body.id;
	Subsidiary.findByIdAndRemove(id, function() {
		Event.update({ 'subsidiary': id }, { $unset: { 'subsidiary': id } }, {multi: true}).exec(function() {
			del.sync(__appdir + '/public/images/subsidiarys/' + id);
			res.send('ok');
		});
	});
}