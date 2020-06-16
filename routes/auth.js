const express = require('express');
const cookiesession = require('cookie-session');
const passport = require('passport');
const config = require('config');
const GoogleStrategy = require('passport-google-oauth20');
const router = express.Router();

router.use(
	cookiesession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [config.get('cookieKey')],
	})
);

router.use(passport.initialize());
router.use(passport.session());

// @route   GET /api/logout/
// @desc    Logout User
// @access  PUBLIC
router.get('/api/logout', (req, res) => {
	req.logOut();
	res.send(req.user);
});

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: config.get('googleClientID'),
			clientSecret: config.get('googleClientSecret'),
			callbackURL: '/auth/google/callback',
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id });

			if (existingUser) {
				done(null, existingUser);
			} else {
				new User({ googleId: profile.id }).save.then((user) =>
					done(null, user)
				);
			}
		}
	)
);

// @route   GET /api/auth/google
// @desc    Login with Google
// @access  PUBLIC
router.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: ['profile', 'email'],
	})
);

router.get('/auth/google/callback', passport.authenticate('google'));

module.exports = router;
