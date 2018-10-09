var mongoose = require('mongoose');
		mongoose.connect('localhost', 'main');

var express = require('express'),
		bodyParser = require('body-parser'),
		multer = require('multer'),
		accepts = require('accepts'),
		cookieParser = require('cookie-parser'),
		session = require('express-session'),
		methodOverride = require('method-override'),
			app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');


var MongoStore = require('connect-mongo')(session);
var i18n = require('i18n');

i18n.configure({
	locales: ['ru', 'en'],
	defaultLocale: 'ru',
	cookie: 'locale',
	directory: __dirname + '/locales'
});

if (process.env.NODE_ENV != 'production') {
	app.use(express.static(__dirname + '/public'));
	app.locals.pretty = true;
	app.set('json spaces', 2);
}

app.use(multer({ dest: __dirname + '/uploads', includeEmptyFields: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser());
app.use(i18n.init);

app.use(session({
	key: 'session',
	resave: false,
	saveUninitialized: false,
	secret: 'keyboard cat',
	store: new MongoStore({ mongooseConnection: mongoose.connection }),
	cookie: {
		path: '/',
		maxAge: 1000 * 60 * 60 * 3 // 3 hours
	}
}));


app.use(function(req, res, next) {
	res.locals.session = req.session;
	res.locals.locale = req.cookies.locale || 'ru';
	req.locale = req.cookies.locale || 'ru';
	next();
});


// -------------------
// *** Routes Block ***
// -------------------


var main = require('./routes/main.js');
var events = require('./routes/events.js');
var news = require('./routes/news.js');
var subsidiarys = require('./routes/subsidiarys.js');
var magazines = require('./routes/magazines.js');

var content = require('./routes/content.js');
var files = require('./routes/files.js');

var auth = require('./routes/auth.js');

var admin_users = require('./routes/admin/users.js');
var admin_news = require('./routes/admin/news.js');
var admin_subsidiarys = require('./routes/admin/subsidiarys.js');
var admin_events = require('./routes/admin/events.js');
var admin_categorys = require('./routes/admin/categorys.js');
var admin_magazines = require('./routes/admin/magazines.js');
var admin_contacts = require('./routes/admin/contacts.js');

var options = require('./routes/admin/options.js');
var globals = require('./routes/globals.js');


// ------------------------
// *** Midleware Block ***
// ------------------------



function checkAuth (req, res, next) {
	req.session.user_id ? next() : res.redirect('/login');
}


// ------------------------
// *** Main Routes Block ***
// ------------------------



// === Main Route
app.route('/')
	.get(main.index)
	.post(main.get_events);

// === Events Route
app.route('/events')
	.get(events.index)
	.post(events.get_events);

// === Events Tag Route
app.route('/events/:type').get(events.index);

// === Events Tag Route
app.route('/events/:type/:id').get(events.event);


// === Magazines Route // Публикации
app.route('/publish')
	.get(magazines.index)
	.post(magazines.get_magazines)

// === Magazine Route // Публикации
app.route('/publish/:id').get(magazines.magazine)

/*
// === Subsidiarys Route
app.route('/subsidiarys').get(subsidiarys.index);

// === Subsidiary Route
app.route('/subsidiarys/:id').get(subsidiarys.subsidiary);
*/

// ------------------------
// *** Admin Users Routes Block ***
// ------------------------



// === Admin users Route
app.route('/auth/users').get(checkAuth, admin_users.list);


// === Admin @add users Route
app.route('/auth/users/add')
	 .get(checkAuth, admin_users.add)
	 .post(checkAuth, admin_users.add_form);


// === Admin @edit users Route
app.route('/auth/users/edit/:id')
	 .get(checkAuth, admin_users.edit)
	 .post(checkAuth, admin_users.edit_form);


// === Admin @remove users Route
app.route('/auth/users/remove')
	 .post(checkAuth, admin_users.remove);



// ------------------------
// *** Admin News Routes Block ***
// ------------------------



// === Admin news Route
app.route('/auth/slides').get(checkAuth, admin_news.list);


// === Admin @add news Route
app.route('/auth/slides/add')
	 .get(checkAuth, admin_news.add)
	 .post(checkAuth, admin_news.add_form);


// === Admin @edit news Route
app.route('/auth/slides/edit/:id')
	 .get(checkAuth, admin_news.edit)
	 .post(checkAuth, admin_news.edit_form);


// === Admin @remove news Route
app.route('/auth/slides/remove')
	 .post(checkAuth, admin_news.remove);



// ------------------------
// *** Admin Events Routes Block ***
// ------------------------



// === Admin events Route
app.route('/auth/events').get(checkAuth, admin_events.list);


// === Admin @add events Route
app.route('/auth/events/add')
	 .get(checkAuth, admin_events.add)
	 .post(checkAuth, admin_events.add_form);


// === Admin @edit events Route
app.route('/auth/events/edit/:id')
	 .get(checkAuth, admin_events.edit)
	 .post(checkAuth, admin_events.edit_form);


// === Admin @remove events Route
app.route('/auth/events/remove')
	 .post(checkAuth, admin_events.remove);

// === Admin @hide events Route
app.route('/auth/events/hide')
	 .post(checkAuth, admin_events.hide);


// ------------------------
// *** Admin Categorys Routes Block ***
// ------------------------



// === Admin categorys Route
app.route('/auth/categorys')
	 .get(checkAuth, admin_categorys.list);


// === Admin @add categorys Route
app.route('/auth/categorys/add')
	 .get(checkAuth, admin_categorys.add)
	 .post(checkAuth, admin_categorys.add_form);


// === Admin @edit categorys Route
app.route('/auth/categorys/edit/:id')
	 .get(checkAuth, admin_categorys.edit)
	 .post(checkAuth, admin_categorys.edit_form);


// === Admin @remove categorys Route
app.route('/auth/categorys/remove')
	 .post(checkAuth, admin_categorys.remove);


// ------------------------
// *** Admin Magazines Routes Block ***
// ------------------------


// === Admin magazines Route
app.route('/auth/magazines').get(checkAuth, admin_magazines.list);


// === Admin @add magazines Route
app.route('/auth/magazines/add')
	 .get(checkAuth, admin_magazines.add)
	 .post(checkAuth, admin_magazines.add_form);


// === Admin @edit magazines Route
app.route('/auth/magazines/edit/:id')
	 .get(checkAuth, admin_magazines.edit)
	 .post(checkAuth, admin_magazines.edit_form);


// === Admin @remove magazines Route
app.route('/auth/magazines/remove')
	 .post(checkAuth, admin_magazines.remove);



// ------------------------
// *** Admin Subsidiarys Routes Block ***
// ------------------------



// === Admin subsidiarys Route
app.route('/auth/subsidiarys').get(checkAuth, admin_subsidiarys.list);


// === Admin @add subsidiarys Route
app.route('/auth/subsidiarys/add')
	 .get(checkAuth, admin_subsidiarys.add)
	 .post(checkAuth, admin_subsidiarys.add_form);


// === Admin @edit subsidiarys Route
app.route('/auth/subsidiarys/edit/:id')
	 .get(checkAuth, admin_subsidiarys.edit)
	 .post(checkAuth, admin_subsidiarys.edit_form);


// === Admin @remove subsidiarys Route
app.route('/auth/subsidiarys/remove')
	 .post(checkAuth, admin_subsidiarys.remove);



// ------------------------
// *** Admin Contacts Content ***
// ------------------------


app.route('/auth/contacts')
	 .get(checkAuth, admin_contacts.edit)
	 .post(checkAuth, admin_contacts.edit_form);

// ------------------------
// *** Auth Routes Block ***
// ------------------------



// === Auth Route
app.route('/auth').get(checkAuth, auth.main);


// === Login Route
app.route('/login')
	 .get(auth.login)
	 .post(auth.login_form);


// === Logout Route
app.route('/logout').get(auth.logout);


// === Registr Route
app.route('/registr')
	 .get(auth.registr)
	 .post(auth.registr_form);



// ------------------------
// *** Content Routes Block ***
// ------------------------

app.route('/about').get(content.about);
app.route('/contacts').get(content.contacts);
app.route('/museum').get(content.museum);
// app.route('/test').get(content.test);

// ------------------------
// *** Options Routers Block ***
// ------------------------


app.route('/preview')
	 .post(options.preview)


// ------------------------
// *** Globals Routers Block ***
// ------------------------


// === Search Route
app.route('/search')
	 .post(globals.search)


// === Locale Route
app.route('/lang/:locale').get(globals.locale);


// ------------------------
// *** Files Routers Block ***
// ------------------------



// === Files #sitemap.xml Route
app.route('/sitemap.xml').get(files.sitemap);


// === Files #robots.txt Route
app.route('/robots.txt').get(files.robots);



// ------------------------
// *** Error Handling Block ***
// ------------------------


// app.use(function(req, res, next) {
// 	var accept = accepts(req);
// 	res.status(404);

// 	// respond with html page
// 	if (accept.types('html')) {
// 		res.render('error', { url: req.url, status: 404 });
// 		return;
// 	}

// 	// respond with json
// 	if (accept.types('json')) {
// 			res.send({
// 			error: {
// 				status: 'Not found'
// 			}
// 		});
// 		return;
// 	}

// 	// default to plain-text
// 	res.type('txt').send('Not found');
// });

// app.use(function(err, req, res, next) {
// 	var status = err.status || 500;

// 	res.status(status);
// 	res.render('error', { error: err, status: status });
// });


// ------------------------
// *** Connect server Block ***
// ------------------------


app.listen(process.env.PORT || 3000);
console.log('http://127.0.0.1:3000')