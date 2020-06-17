import React, { useRef, useContext, useEffect } from 'react';
import { Grid, TextField, makeStyles } from '@material-ui/core';
import TeacherContext from '../context/teacher/teacherContext';

const useStyles = makeStyles({
	content: {
		marginTop: '20px',
	},
	centerDiv: {
		margin: '0px auto',
	},
});

const TeacherSearch = () => {
	const classes = useStyles();
	const teacherContext = useContext(TeacherContext);
	const text = useRef('');

	const { filtered, filterTeachers, clearFilter } = teacherContext;

	useEffect(() => {
		console.log('I am in Use Effect');
		if (filtered === null) {
			text.current.value = '';
		}
	}, [filtered]);

	const onChange = (e) => {
		console.log('onChange' + e.target.value);
		if (e.target.value !== '') {
			filterTeachers(e.target.value);
		} else {
			clearFilter();
		}
	};

	return (
		<Grid container alignItems='center' className={classes.content}>
			<Grid item>
				<TextField
					id='outlined-basic'
					label='Outlined'
					variant='outlined'
					ref={text}
					onChange={onChange}
				/>
			</Grid>
		</Grid>
	);
};

export default TeacherSearch;
