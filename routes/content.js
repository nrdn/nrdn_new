exports.about = function(req, res) {
  res.render('static/about');
}

exports.contacts = function(req, res) {
  res.render('static/contacts');
}

exports.museum = function(req, res) {
  res.render('static/museum.jade');
}

exports.test = function(req, res) {
  res.render('static/test.jade');
}