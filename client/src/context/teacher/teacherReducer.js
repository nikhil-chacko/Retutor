import { GET_TEACHERS, GET_TEACHER_BY_NAME, ADD_TEACHER } from '../types';

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
		default:
			return state;
	}
};
