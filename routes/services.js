var jade = require('jade');
var path = require('path');
var __appdir = path.dirname(require.main.filename);

var Service = require('../models/main.js').Service;


// ------------------------
// *** services Block ***
// ------------------------


exports.index = function(req, res) {
  Service.where('title.lg').equals(req.locale).where('status').ne('hidden').limit(12).sort('num').exec(function(err, services) {
    res.render('services', {services: services});
  });
}

exports.services = function(req, res) {
  var id = req.params.id;

  Service.findById(id).exec(function(err, service) {
    res.render('services/service.jade', {service: service});
  });
}

exports.get_services = function(req, res) {
  var post = req.body;

  Service.where('title.lg').equals(req.locale).where('status').ne('hidden').sort('num').skip(post.skip).limit(post.limit).exec(function(err, service) {
    if (services.length > 0) {
      res.send(jade.renderFile(__appdir + '/views/services/get_services.jade', {service: service, locale: req.locale}));
    } else {
      res.send('out');
    }
  });
}