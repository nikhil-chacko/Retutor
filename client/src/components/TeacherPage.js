import React, { useContext, useEffect, Fragment } from 'react';
import TeacherSearch from './TeacherSearch';

import Card from './Card';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './NavBar';
import TeacherContext from '../context/teacher/teacherContext';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles({
	content: {
		marginTop: '20px',
	},
	centerDiv: {
		margin: '0px auto',
	},
});

const TeacherPage = () => {
	const teacherContext = useContext(TeacherContext);
	const { teachers, getTeachers, loading, filtered } = teacherContext;

	useEffect(() => {
		getTeachers();

		// eslint-disable-next-line
	}, []);

	const classes = useStyles();
	return (
		<Grid container direction='column'>
			<Grid item>
				<NavBar />
			</Grid>
			<Grid item>
				<TeacherSearch />
			</Grid>
			<Grid container direction='row' className={classes.content}>
				<Grid item xs={1} /> {/*padding*/}
				<Grid container xs={10} spacing={1}>
					{!loading && teachers.length > 0 ? (
						<Fragment>
							{filtered !== null
								? filtered.map((teacher) => (
										<Grid
											item
											xs={10}
											md={6}
											key={teacher._id}
											className={classes.centerDiv}>
											<Card
												institution={
													teacher.institution
												}
												teacherName={
													teacher.teacherName
												}
												fullName={teacher.fullName}
												rating={teacher.rating}
											/>
										</Grid>
								  ))
								: teachers.map((teacher) => (
										<Grid
											item
											xs={10}
											md={6}
											key={teacher._id}
											className={classes.centerDiv}>
											<Card
												institution={
													teacher.institution
												}
												teacherName={
													teacher.teacherName
												}
												fullName={teacher.fullName}
												rating={teacher.rating}
											/>
										</Grid>
								  ))}
						</Fragment>
					) : (
						<Grid container spacing={2}>
							<Grid
								item
								xs={10}
								md={6}
								className={classes.centerDiv}>
								<Skeleton variant='rect' height={200} />
							</Grid>
							<Grid
								item
								xs={10}
								md={6}
								className={classes.centerDiv}>
								<Skeleton variant='rect' height={200} />
							</Grid>
							<Grid
								item
								xs={10}
								md={6}
								className={classes.centerDiv}>
								<Skeleton variant='rect' height={200} />
							</Grid>
							<Grid
								item
								xs={10}
								md={6}
								className={classes.centerDiv}>
								<Skeleton variant='rect' height={200} />
							</Grid>
						</Grid>
					)}
				</Grid>
				<Grid item xs={1} /> {/*padding*/}
			</Grid>
		</Grid>
	);
};

export default TeacherPage;
