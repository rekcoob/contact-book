import React, { useContext, useEffect, useState } from 'react';
import { ContactContext } from '../../context/contact/contactContext';

const emptyContact = {
	name: '',
	email: '',
	phone: '',
	type: 'personal',
};

export const ContactForm: React.FC = () => {
	const { createContact, updateContact, current, clearCurrent } = useContext(
		ContactContext
	);

	useEffect(() => {
		if (current !== null) {
			setContact(current);
		} else {
			setContact(emptyContact);
		}
	}, [current]);

	const [contact, setContact] = useState(emptyContact);
	const { name, email, phone, type } = contact;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setContact({ ...contact, [e.target.name]: e.target.value });

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (current === null) {
			// @ts-ignore
			createContact(contact);
		} else {
			// @ts-ignore
			updateContact(contact);
		}
		// clearAll();
		setContact(emptyContact);
	};

	const clearAll = () => {
		clearCurrent();
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2 className="text-primary">
				{current ? 'Edit Contact' : 'Add Contact'}
			</h2>
			<input
				type="text"
				placeholder="Name"
				name="name"
				value={name}
				onChange={handleChange}
			/>
			<input
				type="email"
				placeholder="Email"
				name="email"
				value={email}
				onChange={handleChange}
			/>
			<input
				type="text"
				placeholder="Phone"
				name="phone"
				value={phone}
				onChange={handleChange}
			/>
			<h5>Contact Type</h5>
			<input
				type="radio"
				name="type"
				value="personal"
				checked={type === 'personal'}
				onChange={handleChange}
			/>
			Personal{' '}
			<input
				type="radio"
				name="type"
				value="professional"
				checked={type === 'professional'}
				onChange={handleChange}
			/>
			Professional{' '}
			<div>
				<input
					type="submit"
					value={current ? 'Update Contact' : 'Add Contact'}
					className="btn btn-primary btn-block"
				/>
			</div>
			{current && (
				<div>
					<button className="btn btn-light btn-block" onClick={clearAll}>
						Clear
					</button>
				</div>
			)}
		</form>
	);
};
