import React, { useContext, useState, useEffect } from 'react';
import { Button, TextField, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TeacherContext from '../context/teacher/teacherContext';

const useStyles = makeStyles((theme) => ({
	formContainer: {
		marginTop: '100px',
		background: '#fafafa',
		border: '1px solid #cfcfcf',
		borderRadius: '5px',
	},
	paper: {
		marginTop: theme.spacing(4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

function AddTeacher(props) {
	const teacherContext = useContext(TeacherContext);

	const { addTeacher, loading } = teacherContext;

	const [teacher, setTeacher] = useState({
		teacherName: '',
		fullName: '',
		institution: '',
	});

	const { teacherName, fullName, institution } = teacher;

	const onChange = (e) => {
		setTeacher({
			...teacher,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		addTeacher({
			teacherName,
			fullName,
			institution,
		});
	};

	const classes = useStyles();

	return (
		<Container
			component='main'
			maxWidth='xs'
			className={classes.formContainer}>
			<div className={classes.paper}>
				<Typography component='h1' variant='h5' color='secondary'>
					Add New Teacher
				</Typography>
				<form className={classes.form} noValidate onSubmit={onSubmit}>
					<TextField
						onChange={onChange}
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='teacherName'
						value={teacherName}
						label='Unique Teacher Name'
						name='teacherName'
						autoFocus
					/>
					<TextField
						onChange={onChange}
						variant='outlined'
						margin='normal'
						required
						fullWidth
						name='fullName'
						value={fullName}
						label='Full Name'
						id='fullName'
					/>
					<TextField
						onChange={onChange}
						variant='outlined'
						margin='normal'
						required
						fullWidth
						name='institution'
						value={institution}
						label='Institution'
						id='institution'
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}>
						Add Teacher
					</Button>
				</form>
			</div>
		</Container>
	);
}

export default AddTeacher;
