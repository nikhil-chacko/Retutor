const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
	teacherName: {
		type: String,
		required: true,
		unique: true,
	},
	institution: {
		type: String,
	},
	fullName: {
		type: String,
		required: true,
	},
	subjects: [
		{
			name: {
				type: String,
			},
		},
	],
	rating: {
		type: Number,
		default: 0,
	},
	totalRatings: {
		type: Number,
		default: 0,
	},
	comments: [
		{
			comment: {
				type: String,
			},
			by: {
				type: String,
			},
		},
	],
});

module.exports = mongoose.model('teacher', TeacherSchema);
