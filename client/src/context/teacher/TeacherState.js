import React, { useReducer } from 'react';
import axios from 'axios';
import TeacherContext from './teacherContext';
import teacherReducer from './teacherReducer';

import {
	GET_TEACHERS,
	GET_TEACHER_BY_NAME,
	ADD_TEACHER,
	ADD_RATING,
	ADD_COMMENT,
	FILTER_TEACHERS,
	CLEAR_FILTER,
} from '../types';

const TeacherState = (props) => {
	const initialState = {
		teachers: [],
		teacher: {},
		loading: true,
		filtered: null,
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

	// Add Comment
	const addComment = async (name, formData) => {
		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.put(
				`/api/teachers/${name}/comment`,
				formData,
				config
			);
			console.log('Updated');
			dispatch({ type: ADD_COMMENT, payload: res.data });
		} catch (error) {
			console.log(error);
		}
	};

	// Filter Teachers
	const filterTeachers = (text) => {
		console.log('filterState ' + text);
		dispatch({ type: FILTER_TEACHERS, payload: text });
	};

	// Clear Filter
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	return (
		<TeacherContext.Provider
			value={{
				teachers: state.teachers,
				loading: state.loading,
				teacher: state.teacher,
				filtered: state.filtered,
				filterTeachers,
				clearFilter,
				getTeachers,
				getTeacherByName,
				addTeacher,
				addRating,
				addComment,
			}}>
			{props.children}
		</TeacherContext.Provider>
	);
};

export default TeacherState;
