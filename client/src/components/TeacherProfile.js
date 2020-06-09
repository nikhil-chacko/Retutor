import React, { useContext, useEffect, useState } from 'react';
import TeacherContext from '../context/teacher/teacherContext';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';
import {
	Avatar,
	Paper,
	makeStyles,
	Typography,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '60%',
		display: 'flex',
		justifyContent: 'space-between',
		margin: '50px auto',
		padding: theme.spacing(2),
	},
	avatar: {
		alignSelf: 'center',
		'& > *': {
			width: theme.spacing(16),
			height: theme.spacing(16),
		},
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
}));

function TeacherProfile() {
	const teacherContext = useContext(TeacherContext);
	const { teacher, getTeacherByName, loading } = teacherContext;

	const [age, setAge] = React.useState('');
	const [open, setOpen] = React.useState(false);

	const { tName } = useParams();

	useEffect(() => {
		getTeacherByName(tName);
		console.log(tName);
		console.log(loading);
		console.log(teacher);
		console.log('Use effect');
	}, [teacher]);

	const handleChange = (event) => {
		setAge(event.target.value);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const classes = useStyles();
	return (
		<div>
			{!loading && teacher != null ? (
				<Paper elevation={2} className={classes.root}>
					<div className={classes.avatar}>
						<Avatar
							alt='Remy Sharp'
							src='/static/images/avatar/1.jpg'
						/>
					</div>
					<div>
						<Typography variant='h5'>
							Full Name: {teacher.fullName}
						</Typography>
						<br />
						<Typography variant='h6'>
							Teacher Name: {teacher.teacherName}
						</Typography>{' '}
						<br />
						<Typography variant='h6'>
							Rating: {teacher.rating}
						</Typography>{' '}
						<br />
						<Typography variant='h6'>
							Total Ratings: {teacher.totalRatings}
						</Typography>{' '}
						<br />
						<FormControl className={classes.formControl}>
							<InputLabel id='demo-controlled-open-select-label'>
								Rating
							</InputLabel>
							<Select
								labelId='demo-controlled-open-select-label'
								id='demo-controlled-open-select'
								open={open}
								onClose={handleClose}
								onOpen={handleOpen}
								value={age}
								onChange={handleChange}
							>
								<MenuItem value=''>
									<em>None</em>
								</MenuItem>
								<MenuItem value={1}>1</MenuItem>
								<MenuItem value={2}>2</MenuItem>
								<MenuItem value={3}>3</MenuItem>
								<MenuItem value={4}>4</MenuItem>
								<MenuItem value={5}>5</MenuItem>
								<MenuItem value={6}>6</MenuItem>
								<MenuItem value={7}>7</MenuItem>
								<MenuItem value={8}>8</MenuItem>
								<MenuItem value={9}>9</MenuItem>
								<MenuItem value={10}>10</MenuItem>
							</Select>
						</FormControl>
					</div>
				</Paper>
			) : (
				<Skeleton variant='rect' height={200} />
			)}
		</div>
	);
}

export default TeacherProfile;
