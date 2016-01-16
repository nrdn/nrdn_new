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
var vacancys = require('./routes/vacancys.js');
var partners = require('./routes/partners.js');
var services = require('./routes/services.js');
var collects = require('./routes/collects.js');
var history = require('./routes/history.js');
var exposure = require('./routes/exposure.js');
var subsidiarys = require('./routes/subsidiarys.js');
var souvenirs = require('./routes/souvenirs.js');
var magazines = require('./routes/magazines.js');
var teams = require('./routes/teams.js');
var specials = require('./routes/specials.js');

var content = require('./routes/content.js');
var files = require('./routes/files.js');

var auth = require('./routes/auth.js');

var admin_users = require('./routes/admin/users.js');
var admin_history = require('./routes/admin/history.js');
var admin_news = require('./routes/admin/news.js');
var admin_vacancys = require('./routes/admin/vacancys.js');
var admin_partners = require('./routes/admin/partners.js');
var admin_services = require('./routes/admin/services.js');
var admin_exhibits = require('./routes/admin/exhibits.js');
var admin_collects = require('./routes/admin/collects.js');
var admin_halls = require('./routes/admin/halls.js');
var admin_subsidiarys = require('./routes/admin/subsidiarys.js');
var admin_events = require('./routes/admin/events.js');
var admin_categorys = require('./routes/admin/categorys.js');
var admin_catalogues= require('./routes/admin/catalogues.js');
var admin_souvenirs = require('./routes/admin/souvenirs.js');
var admin_magazines = require('./routes/admin/magazines.js');
var admin_teams = require('./routes/admin/teams.js');

var admin_specials = require('./routes/admin/specials.js');

var admin_partnership = require('./routes/admin/partnership.js');
var admin_serviceship = require('./routes/admin/serviceship.js');
var admin_contacts = require('./routes/admin/contacts.js');
var admin_schedule = require('./routes/admin/schedule.js');
var admin_gallerys = require('./routes/admin/gallerys.js');

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
	.get(globals.imageGallery('main'), main.index)
	.post(main.get_events);

// === Events Route
app.route('/events')
	.get(events.index)
	.post(events.get_events);

// === Events Tag Route
app.route('/events/:type').get(events.index);

// === Events Tag Route
app.route('/events/:type/:id').get(events.event);

// === News Route
app.route('/news')
	.get(globals.imageGallery('main'), news.index)
	.post(news.get_news);

// === News Route
app.route('/news/:id').get(news.news);


// === Partnership Route
app.route('/partnership')
	.get(content.partnership)

// === Serviceship Route
app.route('/serviceship')
	.get(content.serviceship)


// === Vacancys Route
app.route('/vacancys')
	.get(globals.imageGallery('main'), vacancys.index)
	.post(vacancys.vacancys);

// === Vacancys Route
app.route('/vacancys/:id').get(globals.imageGallery('main'), vacancys.vacancys);


// === partners Route
app.route('/partners')
	.get(globals.imageGallery('main'), partners.index)
	.post(partners.partners);

// === partners Route
app.route('/partners/:id').get(globals.imageGallery('main'), partners.partners);


// === services Route
app.route('/services')
	.get(globals.imageGallery('main'), services.index)
	.post(services.services);

// === services Route
app.route('/services/:id').get(globals.imageGallery('main'), services.services);



// === Magazines Route // Публикации
app.route('/publish')
	.get(globals.imageGallery('main'), magazines.index)
	.post(magazines.get_magazines)

// === Magazine Route // Публикации
app.route('/publish/:id').get(magazines.magazine)

// === Teams Route
app.route('/team')
	.get(globals.imageGallery('main'), teams.index)
	.post(teams.get_teams)

// === Specials Route
app.route('/specials')
	.get(globals.imageGallery('main'), specials.index)
	.post(specials.get_specials)

// === Special Route
app.route('/specials/:id').get(specials.special)


// === Exposure Route
app.route('/exposure').get(globals.imageGallery('main'), exposure.index);

// === Exposure hall Route
app.route('/exposure/:id').get(exposure.hall);

// === Collections Route
app.route('/collections').get(collects.index);

// === Collection Route
app.route('/collections/:id').get(collects.collect);

// === History Route
app.route('/history').get(globals.imageGallery('history'), history.index);

// === Subsidiarys Route
app.route('/subsidiarys').get(subsidiarys.index);

// === Subsidiary Route
app.route('/subsidiarys/:id').get(subsidiarys.subsidiary);

// === Souvenirs Route
app.route('/souvenirs').get(souvenirs.index);

// === Souvenir Route
app.route('/souvenirs/:id').get(souvenirs.catalogue);


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
app.route('/auth/news').get(checkAuth, admin_news.list);


// === Admin @add news Route
app.route('/auth/news/add')
	 .get(checkAuth, admin_news.add)
	 .post(checkAuth, admin_news.add_form);


// === Admin @edit news Route
app.route('/auth/news/edit/:id')
	 .get(checkAuth, admin_news.edit)
	 .post(checkAuth, admin_news.edit_form);


// === Admin @remove news Route
app.route('/auth/news/remove')
	 .post(checkAuth, admin_news.remove);



// ------------------------
// *** Admin Vacancys Routes Block ***
// ------------------------


// === Admin vacancys Route
app.route('/auth/vacancys').get(checkAuth, admin_vacancys.list);


// === Admin @add vacancys Route
app.route('/auth/vacancys/add')
	 .get(checkAuth, admin_vacancys.add)
	 .post(checkAuth, admin_vacancys.add_form);


// === Admin @edit vacancys Route
app.route('/auth/vacancys/edit/:id')
	 .get(checkAuth, admin_vacancys.edit)
	 .post(checkAuth, admin_vacancys.edit_form);


// === Admin @remove vacancys Route
app.route('/auth/vacancys/remove')
	 .post(checkAuth, admin_vacancys.remove);




// === Admin partners Route
app.route('/auth/partners').get(checkAuth, admin_partners.list);


// === Admin @add partners Route
app.route('/auth/partners/add')
	 .get(checkAuth, admin_partners.add)
	 .post(checkAuth, admin_partners.add_form);


// === Admin @edit partners Route
app.route('/auth/partners/edit/:id')
	 .get(checkAuth, admin_partners.edit)
	 .post(checkAuth, admin_partners.edit_form);


// === Admin @remove partners Route
app.route('/auth/partners/remove')
	 .post(checkAuth, admin_partners.remove);





// === Admin services Route
app.route('/auth/services').get(checkAuth, admin_services.list);


// === Admin @add services Route
app.route('/auth/services/add')
	 .get(checkAuth, admin_services.add)
	 .post(checkAuth, admin_services.add_form);


// === Admin @edit services Route
app.route('/auth/services/edit/:id')
	 .get(checkAuth, admin_services.edit)
	 .post(checkAuth, admin_services.edit_form);


// === Admin @remove services Route
app.route('/auth/services/remove')
	 .post(checkAuth, admin_services.remove);




// ------------------------
// *** Admin History Routes Block ***
// ------------------------



// === Admin history Route
app.route('/auth/history').get(checkAuth, admin_history.list);


// === Admin @add history Route
app.route('/auth/history/add')
	 .get(checkAuth, admin_history.add)
	 .post(checkAuth, admin_history.add_form);


// === Admin @edit history Route
app.route('/auth/history/edit/:id')
	 .get(checkAuth, admin_history.edit)
	 .post(checkAuth, admin_history.edit_form);


// === Admin @remove history Route
app.route('/auth/history/remove')
	 .post(checkAuth, admin_history.remove);



// ------------------------
// *** Admin Exhibitis Routes Block ***
// ------------------------



// === Admin exhibitis Route
app.route('/auth/exhibits').get(checkAuth, admin_exhibits.list);


// === Admin @add exhibitis Route
app.route('/auth/exhibits/add')
	 .get(checkAuth, admin_exhibits.add)
	 .post(checkAuth, admin_exhibits.add_form);


// === Admin @edit exhibitis Route
app.route('/auth/exhibits/edit/:id')
	 .get(checkAuth, admin_exhibits.edit)
	 .post(checkAuth, admin_exhibits.edit_form);


// === Admin @remove exhibitis Route
app.route('/auth/exhibits/remove')
	 .post(checkAuth, admin_exhibits.remove);



// ------------------------
// *** Admin Collects Routes Block ***
// ------------------------



// === Admin collects Route
app.route('/auth/collects').get(checkAuth, admin_collects.list);


// === Admin @add collects Route
app.route('/auth/collects/add')
	 .get(checkAuth, admin_collects.add)
	 .post(checkAuth, admin_collects.add_form);


// === Admin @edit collects Route
app.route('/auth/collects/edit/:id')
	 .get(checkAuth, admin_collects.edit)
	 .post(checkAuth, admin_collects.edit_form);


// === Admin @remove collects Route
app.route('/auth/collects/remove')
	 .post(checkAuth, admin_collects.remove);



// ------------------------
// *** Admin Halls Routes Block ***
// ------------------------



// === Admin halls Route
app.route('/auth/halls').get(checkAuth, admin_halls.list);


// === Admin @add halls Route
app.route('/auth/halls/add')
	 .get(checkAuth, admin_halls.add)
	 .post(checkAuth, admin_halls.add_form);


// === Admin @edit halls Route
app.route('/auth/halls/edit/:id')
	 .get(checkAuth, admin_halls.edit)
	 .post(checkAuth, admin_halls.edit_form);


// === Admin @remove halls Route
app.route('/auth/halls/remove')
	 .post(checkAuth, admin_halls.remove);



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



// ------------------------
// *** Admin Categorys Routes Block ***
// ------------------------



// === Admin categorys Route
app.route('/auth/categorys').get(checkAuth, admin_categorys.list);


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
// *** Admin Catalogues Routes Block ***
// ------------------------


// === Admin catalogues Route
app.route('/auth/catalogues').get(checkAuth, admin_catalogues.list);


// === Admin @add catalogues Route
app.route('/auth/catalogues/add')
	 .get(checkAuth, admin_catalogues.add)
	 .post(checkAuth, admin_catalogues.add_form);


// === Admin @edit catalogues Route
app.route('/auth/catalogues/edit/:id')
	 .get(checkAuth, admin_catalogues.edit)
	 .post(checkAuth, admin_catalogues.edit_form);


// === Admin @remove catalogues Route
app.route('/auth/catalogues/remove')
	 .post(checkAuth, admin_catalogues.remove);


// ------------------------
// *** Admin Souvenirs Routes Block ***
// ------------------------


// === Admin souvenirs Route
app.route('/auth/catalogues/edit/:id/souvenirs').get(checkAuth, admin_souvenirs.list);


// === Admin @add souvenirs Route
app.route('/auth/catalogues/edit/:id/souvenirs/add')
	 .get(checkAuth, admin_souvenirs.add)
	 .post(checkAuth, admin_souvenirs.add_form);


// === Admin @edit souvenirs Route
app.route('/auth/catalogues/edit/:id/souvenirs/edit/:souvenir_id')
	 .get(checkAuth, admin_souvenirs.edit)
	 .post(checkAuth, admin_souvenirs.edit_form);


// === Admin @remove souvenirs Route
app.route('/auth/catalogues/edit/:id/souvenirs/edit/:souvenir_id/remove')
	 .post(checkAuth, admin_souvenirs.remove);


// ------------------------
// *** Admin Gallerys Routes Block ***
// ------------------------



// === Admin gallerys Route
app.route('/auth/gallerys').get(checkAuth, admin_gallerys.list);


// === Admin @add gallerys Route
app.route('/auth/gallerys/add')
	 .get(checkAuth, admin_gallerys.add)
	 .post(checkAuth, admin_gallerys.add_form);


// === Admin @edit gallerys Route
app.route('/auth/gallerys/edit/:id')
	 .get(checkAuth, admin_gallerys.edit)
	 .post(checkAuth, admin_gallerys.edit_form);


// === Admin @remove gallerys Route
app.route('/auth/gallerys/remove')
	 .post(checkAuth, admin_gallerys.remove);


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


// === Admin teams Route
app.route('/auth/teams').get(checkAuth, admin_teams.list);


// === Admin @add teams Route
app.route('/auth/teams/add')
	 .get(checkAuth, admin_teams.add)
	 .post(checkAuth, admin_teams.add_form);


// === Admin @edit teams Route
app.route('/auth/teams/edit/:id')
	 .get(checkAuth, admin_teams.edit)
	 .post(checkAuth, admin_teams.edit_form);


// === Admin @remove teams Route
app.route('/auth/teams/remove')
	 .post(checkAuth, admin_teams.remove);



// === Admin specials Route
app.route('/auth/specials').get(checkAuth, admin_specials.list);


// === Admin @add specials Route
app.route('/auth/specials/add')
	 .get(checkAuth, admin_specials.add)
	 .post(checkAuth, admin_specials.add_form);


// === Admin @edit specials Route
app.route('/auth/specials/edit/:id')
	 .get(checkAuth, admin_specials.edit)
	 .post(checkAuth, admin_specials.edit_form);


// === Admin @remove specials Route
app.route('/auth/specials/remove')
	 .post(checkAuth, admin_specials.remove);





// ------------------------
// *** Admin Contacts Content ***
// ------------------------


app.route('/auth/contacts')
	 .get(checkAuth, admin_contacts.edit)
	 .post(checkAuth, admin_contacts.edit_form);

app.route('/auth/partnership')
	 .get(checkAuth, admin_partnership.edit)
	 .post(checkAuth, admin_partnership.edit_form);

app.route('/auth/serviceship')
	 .get(checkAuth, admin_serviceship.edit)
	 .post(checkAuth, admin_serviceship.edit_form);


app.route('/auth/schedule')
	 .get(checkAuth, admin_schedule.edit)
	 .post(checkAuth, admin_schedule.edit_form);


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


// === Team Route
app.route('/team_st').get(content.team);


// === Test Route
app.route('/test').get(content.test);

// === Services Route
//-app.route('/services').get(globals.imageGallery('main'), content.services);

// === Schedule Route
app.route('/schedule').get(globals.imageGallery('main'), content.schedule);

// === Contacts Route
app.route('/contacts').get(content.contacts);

// === Partnership Route
app.route('/partnership').get(globals.imageGallery('main'), content.partnership);

// === Serviceship Route
app.route('/serviceship').get(globals.imageGallery('main'), content.serviceship);


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