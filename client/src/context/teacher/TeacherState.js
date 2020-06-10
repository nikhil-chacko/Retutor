import React, { useReducer } from 'react';
import axios from 'axios';
import TeacherContext from './teacherContext';
import teacherReducer from './teacherReducer';

import {
	GET_TEACHERS,
	GET_TEACHER_BY_NAME,
	ADD_TEACHER,
	ADD_RATING,
} from '../types';

const TeacherState = (props) => {
	const initialState = {
		teachers: [],
		teacher: {},
		loading: true,
	};

	const [state, dispatch] = useReducer(teacherReducer, initialState);

	// Get All Teachers
	const getTeachers = async () => {
		try {
			const res = await axios.get('/api/teachers');
			console.log(res);
			dispatch({ type: GET_TEACHERS, payload: res.data });
		} catch (error) {
			console.log(error);
		}
	};

	// Get Teacher Info by teacherName
	const getTeacherByName = async (name) => {
		try {
			const res = await axios.get(`/api/teachers/${name}`);
			dispatch({ type: GET_TEACHER_BY_NAME, payload: res.data });
		} catch (error) {
			console.log(error);
		}
	};

	// Add New Teacher
	const addTeacher = async (formData) => {
		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post(
				'/api/teachers/addTeacher',
				formData,
				config
			);
			dispatch({ type: ADD_TEACHER, payload: res.data });
		} catch (error) {
			console.log(error);
		}
	};

	// Add Rating
	const addRating = async (name, formData) => {
		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.put(
				`/api/teachers/${name}/rate`,
				formData,
				config
			);
			console.log('Updated');
			dispatch({ type: ADD_RATING, payload: res.data });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<TeacherContext.Provider
			value={{
				teachers: state.teachers,
				loading: state.loading,
				teacher: state.teacher,
				getTeachers,
				getTeacherByName,
				addTeacher,
				addRating,
			}}
		>
			{props.children}
		</TeacherContext.Provider>
	);
};

export default TeacherState;
