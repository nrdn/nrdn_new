var jade = require('jade');
var path = require('path');
var __appdir = path.dirname(require.main.filename);

var Partner = require('../models/main.js').Partner;


// ------------------------
// *** partners Block ***
// ------------------------


exports.index = function(req, res) {
  Partner.where('title.lg').equals(req.locale).where('status').ne('hidden').limit(12).sort('num').exec(function(err, partners) {
    res.render('partners', {partners: partners});
  });
}

exports.partners = function(req, res) {
  var id = req.params.id;

  Partner.findById(id).exec(function(err, partner) {
    res.render('partners/partner.jade', {partner: partner});
  });
}

exports.get_partners = function(req, res) {
  var post = req.body;

  Partner.where('title.lg').equals(req.locale).where('status').ne('hidden').sort('num').skip(post.skip).limit(post.limit).exec(function(err, partner) {
    if (partners.length > 0) {
      res.send(jade.renderFile(__appdir + '/views/partners/get_partners.jade', {partner: partner, locale: req.locale}));
    } else {
      res.send('out');
    }
  });
}