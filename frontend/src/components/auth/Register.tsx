import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth/authContext';
import { AlertContext } from '../../context/alert/alertContext';
import { History } from 'history';

type Props = {
	history: History;
};

export const Register: React.FC<Props> = ({ history }) => {
	const { registerUser, error, clearErrors, isAuthenticated } = useContext(
		AuthContext
	);
	const { setAlert } = useContext(AlertContext);

	useEffect(() => {
		// redirect after authentication
		if (isAuthenticated) {
			history.push('/contacts');
		}
		if (error === 'That email is already taken') {
			setAlert(error, 'danger');
			clearErrors();
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated, history]);

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});
	const { name, email, password, password2 } = user;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setUser({ ...user, [e.target.name]: e.target.value });

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (name === '' || email === '' || password === '') {
			setAlert('Please enter all fields', 'danger');
		} else if (password !== password2) {
			setAlert('Passwords do not match', 'danger');
		} else {
			registerUser({
				name,
				email,
				password,
			});
		}
	};

	return (
		<div className="form-container">
			<h1>
				Account <span className="text-primary">Register</span>
			</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<input
						type="text"
						name="name"
						value={name}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email Address</label>
					<input
						type="email"
						name="email"
						value={email}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						value={password}
						onChange={handleChange}
						required
						minLength={6}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password2">Password</label>
					<input
						type="password"
						name="password2"
						value={password2}
						onChange={handleChange}
						required
						minLength={6}
					/>
				</div>
				<input
					type="submit"
					value="Register"
					className="btn btn-primary btn-block"
				/>
			</form>
		</div>
	);
};
