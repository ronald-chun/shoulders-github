const express = require('express'),
	router = express.Router(),
	passport = require('./service')

router.use(express.static('public'));
router.use(passport.initialize());
router.use(passport.session());

// Initialize Passport
router.get('/', (req, res) => {
	if (req.isAuthenticated())
		res.redirect('/')
	else
		res.render('login');
})

router.get('/', passport.authenticate('local'));

router.post('/', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}));
router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}));
router.get('/google', passport.authenticate('google'));

router.get('/google/callback', passport.authenticate('google'), {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
});
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect("/")
});


module.exports.initialize = initialize;