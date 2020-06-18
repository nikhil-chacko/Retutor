import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';

import {
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
} from '../types';

const AuthState = (props) => {
	const initialState = {
		isAuthenticated: null,
		loading: true,
		user: null,
		error: null,
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

	//Load User
	const loadUser = async () => {
		try {
			const res = await axios.get('/api/oauth/user');
			dispatch({
				type: USER_LOADED,
				payload: res.data,
			});
		} catch (error) {
			dispatch({
				type: AUTH_ERROR,
			});
		}
	};

	//Register / Login a User
	// const login = async () => {
	// 	try {
	// 		window.open('http://localhost:5000/api/oauth/google', '_self');
	// 		dispatch({
	// 			type: LOGIN_SUCCESS,
	// 			payload: res.data,
	// 		});
	// 		loadUser();
	// 	} catch (error) {
	// 		dispatch({
	// 			type: LOGIN_FAIL,
	// 			payload: error.response.data.msg,
	// 		});
	// 	}
	// };

	//Logout
	const logout = () => dispatch({ type: LOGOUT });

	//Clear Errors
	const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				loadUser,
				login,
				logout,
				clearErrors,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};
export default AuthState;
