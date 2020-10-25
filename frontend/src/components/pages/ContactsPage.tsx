import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth/authContext';
import { ContactFilter } from '../contacts/ContactFilter';
import { ContactForm } from '../contacts/ContactForm';
import { ContactList } from '../contacts/ContactList';

export const ContactsPage: React.FC = () => {
	const { loadUser } = useContext(AuthContext);

	useEffect(() => {
		loadUser();
		// eslint-disable-next-line
	}, []);

	return (
		<div className="grid-2">
			<div>
				<ContactForm />
			</div>
			<div>
				<ContactFilter />
				<ContactList />
			</div>
		</div>
	);
};
