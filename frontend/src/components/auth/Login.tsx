import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth/authContext';
import { AlertContext } from '../../context/alert/alertContext';
import { History } from 'history';

type Props = {
	history: History;
};

export const Login: React.FC<Props> = ({ history }) => {
	const { isAuthenticated, loginUser, error, clearErrors } = useContext(
		AuthContext
	);
	const { setAlert } = useContext(AlertContext);

	useEffect(() => {
		// redirect after authentication
		if (isAuthenticated) {
			history.push('/contacts');
		}
		if (error === 'Invalid Credentials') {
			setAlert(error, 'danger');
			clearErrors();
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated, history]);

	const [user, setUser] = useState({
		email: '',
		password: '',
	});
	// const { email, password } = user;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setUser({ ...user, [e.target.name]: e.target.value });

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// loginUser({
		// 	email,
		// 	password,
		// });
		loginUser(user);
	};

	return (
		<div className="form-container">
			<h1>
				Account <span className="text-primary">Login</span>
			</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="email">Email Address</label>
					<input
						type="email"
						name="email"
						value={user.email}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						value={user.password}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password2">Confirm Password</label>
				</div>
				<input
					type="submit"
					value="Login"
					className="btn btn-primary btn-block"
				/>
			</form>
		</div>
	);
};
