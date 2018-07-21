const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google').Strategy;
const User = require('../database/index').User
passport.use(new LocalStrategy((username, password, done) => {
	User.getAuthenticated(username, password, function(err, user, reason) {
		if (err) done(err);
		// login was successful if we have a user
		if (user) {
			// handle login success
			return done(null, user);
		}
		// otherwise we can determine why we failed
		var reasons = User.failedLogin;
		switch (reason) {
			case reasons.NOT_FOUND:
				return done(null, false, {
					message: 'Incorrect username.'
				});
			case reasons.PASSWORD_INCORRECT:
				return done(null, false, {
					message: 'Incorrect password.'
				});
			case reasons.MAX_ATTEMPTS:
				return done(null, false, {
					message: 'You have too much attempts.'
				});
		}
	});
}));
passport.serializeUser((user, done) => {
	done(null, user.id);
});
passport.deserializeUser((id, done) => {
	//const filter = users.filter((u => u.username === user.username));
	//if (filter.length > 0) {
	User.findById(id, (err, user) => {
		delete user.password
		done(err, user)
	})
});

module.exports = passport;
