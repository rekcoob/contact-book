import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import { contactReducer } from './contactReducer';
import { ACTIONS, IContact, InitialStateType } from './contactTypes';
import { axiosConfig } from '../../utils/axiosConfig';

// Initial State
const initialState = {
	contacts: [],
	current: null,
	filtered: null,
	error: null,
	loading: false,
	getContacts: async () => {},
	createContact: async () => {},
	updateContact() {},
	deleteContact: () => {},
	clearContacts() {},
	setCurrent() {},
	clearCurrent() {},
	filterContacts() {},
	clearFilter() {},
};

// Create context
const ContactContext = createContext<InitialStateType>(initialState);

// Create provider
const ContactState: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(contactReducer, initialState);

	// Get Contacts
	const getContacts = async () => {
		setLoading();
		try {
			const res = await axios.get('/api/contacts');
			dispatch({ type: ACTIONS.GET_CONTACTS, payload: res.data });
		} catch (err) {
			dispatch({ type: ACTIONS.CONTACT_ERROR, payload: err.response.msg });
		}
	};

	// Create Contact
	const createContact = async (contact: IContact) => {
		try {
			const res = await axios.post(
				'/api/contacts/add-contact',
				contact,
				axiosConfig
			);
			dispatch({ type: ACTIONS.CREATE_CONTACT, payload: res.data });
		} catch (err) {
			dispatch({ type: ACTIONS.CONTACT_ERROR, payload: err.response.msg });
		}
	};

	// Update Contact
	const updateContact = async (contact: IContact) => {
		try {
			const res = await axios.put(
				`/api/contacts/edit-contact/${contact._id}`,
				contact,
				axiosConfig
			);
			dispatch({ type: ACTIONS.UPDATE_CONTACT, payload: res.data });
		} catch (error) {
			dispatch({ type: ACTIONS.CONTACT_ERROR, payload: error.response.msg });
		}
	};

	// Delete Contact
	const deleteContact = async (id: number) => {
		try {
			await axios.delete(`/api/contacts/delete-contact/${id}`);
			dispatch({ type: ACTIONS.DELETE_CONTACT, payload: id });
		} catch (error) {
			dispatch({ type: ACTIONS.CONTACT_ERROR, payload: error.response.msg });
		}
	};

	// Clear Contacts
	const clearContacts = () => {
		dispatch({ type: ACTIONS.CLEAR_CONTACTS });
	};

	// Set Current Contact
	const setCurrent = (contact: IContact) => {
		dispatch({ type: ACTIONS.SET_CURRENT, payload: contact });
	};

	// Clear Current Contact
	const clearCurrent = () => {
		dispatch({ type: ACTIONS.CLEAR_CURRENT });
	};

	// Filter Contacts
	const filterContacts = (text: string) => {
		dispatch({ type: ACTIONS.FILTER_CONTACTS, payload: text });
	};

	// Clear Filter
	const clearFilter = () => {
		dispatch({ type: ACTIONS.CLEAR_FILTER });
	};

	// Set Loading
	const setLoading = () => dispatch({ type: ACTIONS.SET_LOADING });

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				loading: state.loading,
				getContacts,
				createContact,
				updateContact,
				deleteContact,
				clearContacts,
				setCurrent,
				clearCurrent,
				filterContacts,
				clearFilter,
			}}
		>
			{children}
			{/* {props.children} */}
		</ContactContext.Provider>
	);
};

export { ContactState, ContactContext };
