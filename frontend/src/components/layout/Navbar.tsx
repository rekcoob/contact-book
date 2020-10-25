import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth/authContext';
import { ContactContext } from '../../context/contact/contactContext';

type Props = {
	title?: string;
	icon?: string;
};

export const Navbar: React.FC<Props> = ({
	title = 'Contact Book',
	icon = 'fas fa-address-card',
}) => {
	const { isAuthenticated, logoutUser, user } = useContext(AuthContext);
	const { clearContacts } = useContext(ContactContext);

	const onLogout = () => {
		logoutUser();
		clearContacts();
	};

	const authLinks = (
		<>
			<li style={{ marginRight: '2rem' }} className="hide-sm">
				Hello {user && user.name}
			</li>
			<li>
				<Link to="/contacts">Contacts</Link>
			</li>
			<li>
				<a onClick={onLogout} href="#!">
					<i className="fas fa-sign-out-alt"></i>{' '}
					<span className="hide-sm">Logout</span>
				</a>
			</li>
		</>
	);

	const guestLinks = (
		<>
			<li>
				<Link to="/login">Login</Link>
			</li>
			<li>
				<Link to="/register">Register</Link>
			</li>
		</>
	);

	return (
		<div className="navbar bg-primary">
			<h1>
				<Link to="/">
					<i className={icon} /> {title}
				</Link>
			</h1>

			<ul>
				{isAuthenticated ? authLinks : guestLinks}
				{/* <li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li> */}
			</ul>
		</div>
	);
};

// Navbar.defaultProps = {
// 	title: 'Contact Diary',
// 	icon: 'fas fa-id-card-alt',
// };
