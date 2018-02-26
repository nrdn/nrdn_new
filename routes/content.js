exports.team = function(req, res) {
  res.render('static/team.jade');
}

exports.partnership = function(req, res) {
  res.render('static/partnership.jade');
}
exports.serviceship = function(req, res) {
  res.render('static/serviceship.jade');
}
exports.live = function(req, res) {
  res.render('static/live.jade');
}

exports.museum = function(req, res) {
  res.render('static/museum.jade');
}

exports.contacts = function(req, res) {
  res.render('static/contacts');
}

exports.test = function(req, res) {
  res.render('static/test.jade');
}