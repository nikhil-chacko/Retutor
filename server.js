const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cookiesession = require('cookie-session');
const config = require('config');
const passport = require('passport');
const cors = require('cors');

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

// set up cors to allow us to accept requests from our client
app.use(
	cors({
		origin: 'http://localhost:3000', // allow to server to accept request from different origin
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true, // allow session cookie from browser to pass through
	})
);

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
