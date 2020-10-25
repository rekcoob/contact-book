import axios from 'axios';

// create a function that takes a JWT
export const setAuthToken = (token: string) => {
	if (token) {
		// if there is a token set a header of 'x-auth-token' with the value of the token
		axios.defaults.headers.common['x-auth-token'] = token;
	} else {
		// if there is no token remove the 'x-auth-token' header
		delete axios.defaults.headers.common['x-auth-token'];
	}
};
