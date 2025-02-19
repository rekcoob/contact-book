import React, { useContext } from 'react';
import { ContactContext } from '../../context/contact/contactContext';
import { IContact } from '../../context/contact/contactTypes';

type Props = {
	contact: IContact;
};

export const ContactItem: React.FC<Props> = ({ contact }) => {
	const { _id, name, email, phone, type } = contact;
	const { deleteContact, setCurrent, clearCurrent } = useContext(
		ContactContext
	);

	const onDelete = () => {
		deleteContact(_id);
		clearCurrent();
	};

	return (
		<div className="card bg-light">
			<h3 className="text-primary text-left">
				{name}{' '}
				<span
					style={{ float: 'right' }}
					className={
						'badge ' +
						(type === 'professional' ? 'badge-success' : 'badge-primary')
					}
				>
					{type.charAt(0).toUpperCase() + type.slice(1)}
				</span>
			</h3>
			<ul className="list">
				{email && (
					<li>
						<i className="fas fa-envelope-open"></i> {email}
					</li>
				)}
				{phone && (
					<li>
						<i className="fas fa-envelope-open"></i> {phone}
					</li>
				)}
			</ul>
			<p>
				<button
					className="btn btn-dark btn-sm"
					onClick={() => setCurrent(contact)}
				>
					Edit
				</button>
				<button className="btn btn-danger btn-sm" onClick={onDelete}>
					Delete
				</button>
			</p>
		</div>
	);
};
