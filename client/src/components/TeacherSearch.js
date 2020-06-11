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

	const text = useRef('');

	const teacherContext = useContext(TeacherContext);
	const { filtered, filterTeachers, clearFilter } = teacherContext;

	useEffect(() => {
		if (filtered === null) {
			text.current.value = '';
		}
	});

	const onChange = (e) => {
		console.log('onChange');
		if (text.current.value !== '') {
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
