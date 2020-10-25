// typescript protected routes URL
// https://stackoverflow.com/questions/47747754/how-to-rewrite-the-protected-private-route-using-typescript-and-react-router-4-a

import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/auth/authContext';

export const PrivateRoute: React.FC<any> = ({
	component: Component,
	...rest
}) => {
	const { isAuthenticated, loading } = useContext(AuthContext);

	return (
		<Route
			{...rest}
			render={(props) =>
				!isAuthenticated && !loading ? (
					<Redirect to="/login" />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};
