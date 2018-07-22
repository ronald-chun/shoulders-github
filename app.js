const result = require('dotenv').config();
if (result.error) {
	throw result.error;
}

const {readdirSync, statSync} = require('fs')
const {join} = require('path')
const express = require('express');
const timeout = require('connect-timeout');

const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const helmet = require('helmet');
const logger = require('morgan');
const contextService = require('request-context');
const multipart = require('connect-multiparty');
const sanitizeHtml = require('sanitize-html');
const multipartMiddleware = multipart();


const app = express();
const csrf = require('csurf');
const dirs = p => readdirSync(p).filter(f => statSync(join(p, f)).isDirectory())
const formatMenu = (menu, url) => {
	var result = [];
	menu.forEach(_m => {
		_m.selected = `/${_m.name}` === url;
		if (_m.group !== undefined) {
			var groupIndex = result.findIndex(_res => _res.group == _m.group)
			if (groupIndex == -1)
				result.push({
					group: _m.group,
					items: [_m],
					selected: _m.selected,
				});
			else {
				result[groupIndex].items.push(_m);
				if (_m.selected)
					result[groupIndex].selected = _m.selected
			}
		} else {
			result.push(_m)
		}
	});
	return result
}
const HTMLfilter = (obj) => {
	var temp = JSON.parse(JSON.stringify(obj));
	Object.keys(temp).forEach((_d) => {
		if (sanitizeHtml(_d, {
				allowedTags: [],
				parser: {
					lowerCaseTags: true
				}
			}) != _d)
			throw new Error(`Key: ${_d} should not contain HTML`)
		if (typeof temp[_d] == "object" && temp[_d] != null) {
			var result = HTMLfilter(temp[_d])
			temp[_d] = result
		} else {
			temp[_d] = sanitizeHtml(temp[_d], {
				allowedTags: sanitizeHtml.defaults.allowedTags.concat(['map', 'videolink', 'url', 'mail']),
				parser: {
					lowerCaseTags: true
				}
			}).replace(/\$lt;/, "<").replace(/\$gt;/, ">")
		}
	})
	return temp
}

// view engine setup
app.set('views', [
	'public/views',
	'components'
]);

app.set('view engine', 'pug');
// app.set('view options', {
// 	layout: 'layout'
// });
// app.use(logger('dev'));


app.use(helmet());
app.disable('x-powered-by')
app.set('trust proxy', 1)



// static routing
// app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(contextService.middleware('request'));
app.use(express.static('public'));
// Initialize sessions
app.use(cookieParser());
app.use(bodyParser.json({
	parameterLimit: '10000'
}));
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(cookieSession({
	name: 'session',
	keys: ['eqewqjr', 'kf3.f'],
}));

app.use(bodyParser.urlencoded({
	extended: true,
	parameterLimit: '10000'
}));

// basic routing
app.use(timeout(30000));
app.use(function(req, res, next) {
	if (!req.timedout) next();
});

// pass layout setting to all pages
app.use(function(req, res, next) {
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

app.use(csrf({
	cookie: true
}));
app.use(function(err, req, res, next) {
	if (err.code !== 'EBADCSRFTOKEN') {
		next(err)
	} else {
		next(err);
	}
// handle CSRF token errors here 
})
app.use(function(req, res, next) {
	res.locals.csrfToken = req.csrfToken()
	next()
})
// XSS
app.use(function(req, res, next) {
	if (HTMLfilter(req.body) instanceof Error) {
		const err = HTMLfilter(req.body);
		err.status = 400;
		next(err);
	} else if (HTMLfilter(req.query) instanceof Error) {
		const err = HTMLfilter(req.query);
		err.status = 400;
		next(err);
	} else {
		req.body = HTMLfilter(req.body);
		req.query = HTMLfilter(req.query)
		next()
	}
});

// nomarl router
app.use((req, res, next) => {
	res.locals.title = process.env.TITLE;
	res.locals.categories = {
		mathematics: {
			'zh': '數學',
			'en': 'Mathematics'
		},
		science: {
			'zh': '科學',
			'en': 'Science'
		},
		robot: {
			'zh': '機械人',
			'en': 'Robot'
		},
		diy: {
			'zh': '動手做',
			'en': 'DIY'
		},
	};
	next()
})

let defaultMenu = [];
const nomarlPage = ["/home"]

app.use((req, res, next) => {
	console.log(req.url)
	// authorize
	res.locals.title = process.env.TITLE;
	res.locals.pageTitle = defaultMenu.find(_d => `/${_d.name}` === req.url) ? defaultMenu.find(_d => `/${_d.name}` === req.url).display : ""
	if (req.user) {
		res.locals.username = req.user.username;
		res.locals.userGroup = req.user.userGroup;
		res.locals.userRights = req.user.userRights;
		if (res.locals.userRights) return res.redirect('login')
		var accessableMenu = defaultMenu.filter(_menu => res.locals.userRights.includes(_menu.name))
		if (!accessableMenu.some(_menu => req.url.startsWith(_menu.action)) && !nomarlPage.includes(req.url)) return res.redirect('login')
		res.locals.menu = formatMenu(accessableMenu, req.url);
	} else {
		res.locals.menu = formatMenu(defaultMenu, req.url);
	}

	next();
});

// initialize modules
if (process.env.PREINIT)
	process.env.PREINIT.split(",").forEach(_md => {
		var obj = require(`./components/${_md}`);
		if (obj.menu)
			defaultMenu = defaultMenu.concat(obj.menu)
		if (obj.router) app.use(`/${obj.name || ""}`, obj.router);
		console.log('router initialize ' + _md);
	})

dirs('./components/').forEach(_md => {
	if (!process.env.PREINIT || !process.env.PREINIT.includes(_md)) {
		var obj = require(`./components/${_md}`);
		if (obj.router) {
			app.use(`/${obj.name || ""}`, obj.router);
			console.log('router initialize ' + _md);
		}
		if (obj.menu)
			defaultMenu = defaultMenu.concat(obj.menu)
	}
})

defaultMenu.sort((a, b) => a.last > b.last)

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/category/:categroy', (req, res) => {
	res.locals.current_menu_item = "category";
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
		res.locals.error = err;

		// console.log(req.app.get('env'));
		// render the error page
		res.send(err.message)
		console.log(err)
	} catch (ex) {}

});

module.exports = app;