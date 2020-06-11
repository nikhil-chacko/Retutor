import {
	GET_TEACHERS,
	GET_TEACHER_BY_NAME,
	ADD_TEACHER,
	FILTER_TEACHERS,
	CLEAR_FILTER,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case GET_TEACHERS:
			return {
				...state,
				teachers: action.payload,
				loading: false,
			};
		case GET_TEACHER_BY_NAME:
			return {
				...state,
				teacher: action.payload,
				loading: false,
			};
		case ADD_TEACHER:
			return {
				...state,
				loading: false,
			};
		case FILTER_TEACHERS:
			return {
				...state,
				//create a new regexp then try to match the passed payload with teacherName and fullName and set it to the filtered state
				filtered: state.teachers.filter((teacher) => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					return (
						teacher.teacherName.match(regex) ||
						teacher.fullName.match(regex)
					);
				}),
			};
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null,
			};
		default:
			return state;
	}
};
