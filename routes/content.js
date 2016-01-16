exports.team = function(req, res) {
  res.render('static/team.jade');
}

exports.partnership = function(req, res) {
  res.render('static/partnership.jade');
}
exports.serviceship = function(req, res) {
  res.render('static/serviceship.jade');
}
/*exports.services = function(req, res) {
  res.render('static/services.jade');
}
*/
exports.live = function(req, res) {
  res.render('static/live.jade');
}

exports.schedule = function(req, res) {
  res.render('static/schedule.jade');
}

exports.contacts = function(req, res) {
  res.render('static/contacts');
}

exports.test = function(req, res) {
  res.render('static/test.jade');
}