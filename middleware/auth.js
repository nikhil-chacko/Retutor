// Auth Middleware
const auth = (req, res, next) => {
	if (!req.user) {
		res.send('Not Authenticated');
	} else {
		next();
	}
};

module.exports = auth;
