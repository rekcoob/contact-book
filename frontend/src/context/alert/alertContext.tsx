import React, { createContext, useReducer } from 'react';
import { alertReducer } from './alertReducer';
import { ACTIONS, AlertStateType } from './alertTypes';

// Initial State
const initialState = {
	alerts: [],
	setAlert() {},
};

// Create context
const AlertContext = createContext<AlertStateType>(initialState);

// Create provider
const AlertState: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(alertReducer, initialState);

	// Set Alert
	const setAlert = (msg: string, type: string, timeout = 5000) => {
		// const id = uuid();
		const id = Math.round(Math.random() * 1000000);
		dispatch({
			type: ACTIONS.SET_ALERT,
			payload: { msg, type, id },
		});
		setTimeout(
			() => dispatch({ type: ACTIONS.REMOVE_ALERT, payload: id }),
			timeout
		);
	};

	return (
		<AlertContext.Provider
			value={{
				alerts: state.alerts,
				setAlert,
			}}
		>
			{children}
			{/* {props.children} */}
		</AlertContext.Provider>
	);
};

export { AlertState, AlertContext };
