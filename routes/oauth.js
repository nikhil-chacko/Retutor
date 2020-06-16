const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const config = require('config');

// Import User Model
const User = require('../models/User');

// Serialize User
passport.serializeUser(async (user, done) => {
	done(null, user.id);
});

// Deserialize User
passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id);
	done(null, user);
});

// Passport Config For Google
passport.use(
	new GoogleStrategy(
		{
			// Options For Strategy
			clientID: config.get('googleClientID'),
			clientSecret: config.get('googleClientSecret'),
			callbackURL: '/api/oauth/google/callback',
		},
		async (accessToken, refreshToken, profile, done) => {
			// Callback Function
			console.log(profile);
			const currentUser = await User.findOne({ googleID: profile.id });
			if (currentUser) {
				console.log(
					`User ${currentUser.username} already exists in Database`
				);
				done(null, currentUser);
			} else {
				const newUser = new User({
					username: profile.displayName,
					googleID: profile.id,
				});
				await newUser.save();
				console.log('New User Created: ' + newUser.username);
				done(null, newUser);
			}
		}
	)
);

// @route   GET /api/oauth/logout
// @desc    Logout User
// @access  PUBLIC
router.get('/api/logout', (req, res) => {
	req.logOut();
	res.send(req.user);
});

// @route   GET /oapi/auth/google
// @desc    Login with Google
// @access  PUBLIC
router.get(
	'/google',
	passport.authenticate('google', {
		scope: ['profile', 'email'],
	})
);

// @route   GET /api/oauth/google/callback
// @desc    Redirect After Login
// @access  PUBLIC
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
	res.send('Redirected');
});

module.exports = router;
