const express = require('express');
const timeout = require('connect-timeout');

const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const helmet = require('helmet');
const path = require('path');
const logger = require('morgan');
const contextService = require('request-context');
const multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var app = express();
var csrf = require('csurf');
var csrfProtection = csrf({
	cookie: true
})
// get config

// view engine setup
app.set('views', [
	path.join(__dirname, 'public/views'),
	path.join(__dirname, 'component'),
]);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// app.set('view options', {
// 	layout: 'layout'
// });

app.use(logger('dev'));

// Initialize sessions
app.use(bodyParser.json({
	parameterLimit: '10000'
}));

app.use(bodyParser.urlencoded({
	extended: true,
	parameterLimit: '10000'
}));

app.use(helmet());
app.disable('x-powered-by')
app.set('trust proxy', 1)

app.use(cookieParser('24fd.g;'));
app.use(cookieSession({
	name: 'session',
	keys: ['eqewqjr', 'kf3.f'],
}));


// static routing
app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(contextService.middleware('request'));

// basic routing
app.use(timeout(30000));
app.use(function(req, res, next) {
	if (!req.timedout) next();
});

// pass layout setting to all pages
app.use(function(req, res, next) {
	// if (utility.isRequestWebPage(req) {
	// 	res.locals.title = process.env.TITLE;
	// 	res.locals.subtitle = process.env.SUBTITLE;
	// }    
	if (req.url.substr(-1) == '/' && req.url.length > 1) {
		res.redirect(301, req.url.slice(0, -1));
	} else {
		next();
	}
});

app.use(multipartMiddleware, function(req, res, next) {
	next()
})

// app.use(function(req, res, next) {
// 	if (req.user) {
// 		contextService.set('request:user', {
// 			username: req.user.username,
// 			userGroup: req.user.userGroup,
// 			homePage: req.user.homePage
// 		});
// 		contextService.set('request:info', {
// 			ip: req.connection.remoteAddress,
// 			userGroup: req.user.userGroup
// 		});
// 	} 
// 	next();
// });

app.use(csrf());
app.use(function(err, req, res, next) {
	if (err.code !== 'EBADCSRFTOKEN') {

		next(err)
	} else {
		next(err);
	}
// handle CSRF token errors here 
})
// XSS
// app.use(function(req, res, next) {
// 	if (utility.HTMLfilter(req.body) instanceof Error) {
// 		const err = utility.HTMLfilter(req.body);
// 		err.status = 400;
// 		next(err);
// 	} else if (utility.HTMLfilter(req.query) instanceof Error) {
// 		const err = utility.HTMLfilter(req.query);
// 		err.status = 400;
// 		next(err);
// 	} else {
// 		req.body = utility.HTMLfilter(req.body);
// 		req.query = utility.HTMLfilter(req.query)
// 		next()
// 	}
// });

// nomarl router

app.get('/', (req, res) => {
	res.render('index');
});


// catch 404 and forward to error handler

app.use((req, res, next) => {
	console.log('not found: ', req.url);
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use((err, req, res, next) => {
	try {
		if (req.app.get('env') === 'development') {
			console.log('error handler:', err);
		}

		res.locals.message = err.message;
		res.locals.error = err ;

		// console.log(req.app.get('env'));
		// render the error page
		console.log(err)
	} catch (ex) {}

});

module.exports = app