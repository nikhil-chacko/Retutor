const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cookiesession = require('cookie-session');
const config = require('config');
const passport = require('passport');

// Body Parser
app.use(express.json({ extended: false }));

// Cookie Session
app.use(
	cookiesession({
		maxAge: 24 * 60 * 60 * 1000,
		keys: [config.get('cookieKey')],
	})
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to Database
connectDB();

// Routes
app.use('/api/teachers', require('./routes/teachers'));
app.use('/api/oauth', require('./routes/oauth'));

app.get('/', (req, res) => {
	res.send('<h1>Hello </h1>');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server Started On Port ${port}`);
});
