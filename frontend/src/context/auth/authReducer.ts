import { ACTIONS, AuthActions, AuthStateType } from './authTypes';

export const authReducer = (state: AuthStateType, action: AuthActions) => {
	switch (action.type) {
		case ACTIONS.USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload,
			};
		case ACTIONS.LOGIN_SUCCESS:
		case ACTIONS.REGISTER_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
			};
		case ACTIONS.REGISTER_FAIL:
		case ACTIONS.LOGIN_FAIL:
		case ACTIONS.AUTH_ERROR:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: action.payload,
			};
		case ACTIONS.LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
			};
		case ACTIONS.CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
