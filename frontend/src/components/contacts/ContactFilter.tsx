import React, { useContext, useRef, useEffect } from 'react';
import { ContactContext } from '../../context/contact/contactContext';
import { ContactItem } from './ContactItem';

type Props = {};

export const ContactFilter: React.FC = () => {
	const { filtered, filterContacts, clearFilter } = useContext(ContactContext);
	const searchInput = useRef<any>('');

	useEffect(() => {
		if (filtered === null) {
			// @ts-ignore
			searchInput.current.value = '';
			// searchInput.current.value = null;
		}
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (searchInput.current.value !== '') {
			// filterContacts(searchInput.current.value);
			filterContacts(e.target.value);
		} else {
			clearFilter();
		}
	};

	return (
		<form>
			<input
				ref={searchInput}
				type="text"
				placeholder="Filter Contacts..."
				onChange={handleChange}
			/>
		</form>
	);
};
