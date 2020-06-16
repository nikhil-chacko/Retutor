const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: String,
	googleID: String,
});

module.exports = mongoose.model('User', UserSchema);
