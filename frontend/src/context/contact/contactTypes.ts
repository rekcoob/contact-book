export interface IContact {
	_id: number;
	name: string;
	email: string;
	phone: string;
	type: string;
}

export type InitialStateType = {
	contacts: IContact[];
	current: IContact | null;
	filtered: IContact[] | null;
	loading: boolean;
	error: string | null;
	getContacts: () => Promise<void>;
	createContact: (contact: IContact) => Promise<void>;
	updateContact: (contact: IContact) => void;
	deleteContact: (id: number) => void;
	clearContacts: () => void;
	setCurrent: (contact: IContact) => void;
	clearCurrent: () => void;
	filterContacts: (text: string) => void;
	clearFilter: () => void;
};

export type ContactActions =
	| { type: 'GET_CONTACTS'; payload: IContact[] }
	| { type: 'CREATE_CONTACT'; payload: IContact }
	| { type: 'UPDATE_CONTACT'; payload: IContact }
	| { type: 'DELETE_CONTACT'; payload: number }
	| { type: 'CLEAR_CONTACTS' }
	| { type: 'SET_CURRENT'; payload: IContact }
	| { type: 'CLEAR_CURRENT' }
	| { type: 'FILTER_CONTACTS'; payload: string }
	| { type: 'CONTACT_ERROR'; payload: string }
	| { type: 'CLEAR_FILTER' }
	| { type: 'SET_LOADING' };

export enum ACTIONS {
	GET_CONTACTS = 'GET_CONTACTS',
	CREATE_CONTACT = 'CREATE_CONTACT',
	UPDATE_CONTACT = 'UPDATE_CONTACT',
	UPDATE_FILTERED = 'UPDATE_FILTERED',
	DELETE_CONTACT = 'DELETE_CONTACT',
	CLEAR_CONTACTS = 'CLEAR_CONTACTS',
	SET_CURRENT = 'SET_CURRENT',
	CLEAR_CURRENT = 'CLEAR_CURRENT',
	FILTER_CONTACTS = 'FILTER_CONTACTS',
	CLEAR_FILTER = 'CLEAR_FILTER',
	CONTACT_ERROR = 'CONTACT_ERROR',
	SET_LOADING = 'SET_LOADING',
}
