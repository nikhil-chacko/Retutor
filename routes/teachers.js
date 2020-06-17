const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Get Teacher Model
const Teacher = require('../models/Teacher');

// @route   GET /api/teachers/
// @desc    Get Teacher List
// @access  PUBLIC
router.get('/', async (req, res) => {
	const teachers = await Teacher.find({}).sort('teacherName');
	res.json(teachers);
});

// @route   GET /api/teachers/:tname
// @desc    Get Teacher Profile
// @access  PUBLIC
router.get('/:tname', async (req, res) => {
	try {
		const teacher = await Teacher.findOne({
			teacherName: req.params.tname,
		});
		res.json(teacher);
	} catch (error) {
		console.log(error);
	}
});

// @route   POST /api/teachers/addTeacher
// @desc    Add New Teacher
// @access  PRIVATE
router.post('/addTeacher', auth, async (req, res) => {
	const { teacherName, fullName, institution } = req.body;

	const newTeacher = new Teacher({
		teacherName,
		fullName,
		institution,
	});
	await newTeacher.save();
	res.send(newTeacher);
});

// @route   PUT /api/teachers/:tname/rate
// @desc    Update Rating
// @access  PRIVATE
router.put('/:tname/rate', auth, async (req, res) => {
	try {
		const teacher = await Teacher.findOne({
			teacherName: req.params.tname,
		});

		teacher.totalRatings += 1;
		if (teacher.totalRatings == 1) {
			teacher.rating = req.body.rating;
		} else {
			teacher.rating =
				(teacher.rating + req.body.rating) / teacher.totalRatings;
		}
		console.log('Updated');
		await teacher.save();
		res.json(teacher);
	} catch (error) {
		console.log(error);
	}
});

// @route   PUT /api/teachers/:tname/comment
// @desc    Update Comments
// @access  PRIVATE
router.put('/:tname/comment', auth, async (req, res) => {
	try {
		const teacher = await Teacher.findOne({
			teacherName: req.params.tname,
		});

		cmt = {
			comment: req.body.comment,
			by: 'Default User',
		};

		teacher.comments.unshift(cmt);
		await teacher.save();
		res.json(teacher);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
