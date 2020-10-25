import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import { authReducer } from './authReducer';
import { setAuthToken } from '../../utils/setAuthToken';
import { ACTIONS, AuthStateType, ILoginUser, IRegisterUser } from './authTypes';
import { axiosConfig } from '../../utils/axiosConfig';

// Initial State
const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	user: null,
	loading: true,
	error: null,
	registerUser: async () => {},
	loadUser: async () => {},
	loginUser: async () => {},
	logoutUser: () => {},
	clearErrors: () => {},
};

// Create Context
const AuthContext = createContext<AuthStateType>(initialState);

// Create Provider
const AuthState: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

	// Load User / Check User
	const loadUser = async () => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}
		try {
			const res = await axios.get('/api/users/login');
			dispatch({
				type: ACTIONS.USER_LOADED,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: ACTIONS.AUTH_ERROR,
				payload: err.response.data.msg,
			});
		}
	};

	// Register User
	const registerUser = async (formData: IRegisterUser) => {
		try {
			const res = await axios.post(
				'/api/users/register',
				formData,
				axiosConfig
			);
			dispatch({
				type: ACTIONS.REGISTER_SUCCESS,
				// res.data = token
				payload: res.data,
			});
			loadUser();
		} catch (err) {
			dispatch({
				type: ACTIONS.REGISTER_FAIL,
				// msg : string
				payload: err.response.data.msg,
			});
		}
	};

	// Login User
	const loginUser = async (formData: ILoginUser) => {
		try {
			const res = await axios.post('/api/users/login', formData, axiosConfig);
			dispatch({
				type: ACTIONS.LOGIN_SUCCESS,
				// res.data = token
				payload: res.data,
			});
			loadUser();
		} catch (err) {
			dispatch({
				type: ACTIONS.LOGIN_FAIL,
				// msg : string
				payload: err.response.data.msg,
			});
		}
	};

	// Logout User
	const logoutUser = () => {
		dispatch({ type: ACTIONS.LOGOUT });
	};

	// Clear Errors
	const clearErrors = () => {
		dispatch({
			type: ACTIONS.CLEAR_ERRORS,
		});
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				user: state.user,
				loading: state.loading,
				error: state.error,
				registerUser,
				loadUser,
				loginUser,
				logoutUser,
				clearErrors,
			}}
		>
			{children}
			{/* {props.children} */}
		</AuthContext.Provider>
	);
};

export { AuthState, AuthContext };
