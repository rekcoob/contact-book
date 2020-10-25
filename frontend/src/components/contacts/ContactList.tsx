import React, { useContext, useEffect } from 'react';
import { ContactContext } from '../../context/contact/contactContext';
import { Spinner } from '../layout/Spinner';
import { ContactItem } from './ContactItem';

export const ContactList: React.FC = () => {
	const { contacts, getContacts, filtered, loading } = useContext(
		ContactContext
	);

	useEffect(() => {
		getContacts();
		// eslint-disable-next-line
	}, []);

	if (loading) {
		return <Spinner />;
	} else if (!loading && contacts.length === 0) {
		return <h4>Please add a contact</h4>;
	} else
		return (
			<>
				{filtered !== null
					? filtered.map((contact) => (
							<ContactItem key={contact._id} contact={contact} />
					  ))
					: contacts.map((contact) => (
							<ContactItem key={contact._id} contact={contact} />
					  ))}
			</>
		);
};
