var jade = require('jade');
var path = require('path');
var __appdir = path.dirname(require.main.filename);

var Special = require('../models/main.js').Special;


// ------------------------
// *** Special Block ***
// ------------------------


exports.index = function(req, res) {
  Special.where('title.lg').equals(req.locale).limit(12).sort('-date').exec(function(err, specials) {
    res.render('specials', {specials: specials});
  });
}

exports.special = function(req, res) {
  var id = req.params.id;

  Special.findById(id).exec(function(err, special) {
    res.render('specials/special.jade', {special: special});
  });
}


exports.get_specials = function(req, res) {
  var post = req.body;

  Special.where('title.lg').equals(req.locale).sort('-date').skip(post.skip).limit(post.limit).exec(function(err, specials) {
    if (specials.length > 0) {
      res.send(jade.renderFile(__appdir + '/views/specials/get_specials.jade', {specials: specials, locale: req.locale}));
    } else {
      res.send('out');
    }
  });
}