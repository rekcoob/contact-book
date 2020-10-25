export interface ILoginUser {
	email: string;
	password: string;
}

export interface IRegisterUser extends ILoginUser {
	name: string;
}

export type AuthStateType = {
	token: string | null;
	isAuthenticated: boolean;
	user: null | any;
	loading: boolean;
	error: string | null;
	registerUser: (formData: IRegisterUser) => Promise<void>;
	loadUser: () => Promise<void>;
	loginUser: (formData: ILoginUser) => Promise<void>;
	logoutUser: () => void;
	clearErrors: () => void;
};

export type AuthActions =
	| { type: 'REGISTER_SUCCESS'; payload: Storage }
	| { type: 'REGISTER_FAIL'; payload: string }
	| { type: 'DELETE_CONTACT'; payload: number }
	| { type: 'USER_LOADED'; payload: string }
	| { type: 'AUTH_ERROR'; payload: string }
	| { type: 'LOGIN_SUCCESS'; payload: Storage }
	| { type: 'LOGIN_FAIL'; payload: string }
	| { type: 'LOGOUT' }
	| { type: 'CLEAR_ERRORS' };

export enum ACTIONS {
	REGISTER_SUCCESS = 'REGISTER_SUCCESS',
	REGISTER_FAIL = 'REGISTER_FAIL',
	USER_LOADED = 'USER_LOADED',
	AUTH_ERROR = 'AUTH_ERROR',
	LOGIN_SUCCESS = 'LOGIN_SUCCESS',
	LOGIN_FAIL = 'LOGIN_FAIL',
	LOGOUT = 'LOGOUT',
	CLEAR_ERRORS = 'CLEAR_ERRORS',
}
