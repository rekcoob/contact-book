import { ACTIONS, AlertActions, AlertStateType } from './alertTypes';

export const alertReducer = (state: AlertStateType, action: AlertActions) => {
	switch (action.type) {
		case ACTIONS.SET_ALERT:
			// return [...state, action.payload];
			return {
				...state,
				alerts: [...state.alerts, action.payload],
			};
		case ACTIONS.REMOVE_ALERT:
			// return state.filter((alert: any) => alert.id !== action.payload)
			return {
				...state,
				alerts: state.alerts.filter((alert) => alert.id !== action.payload),
			};
		default:
			return state;
	}
};
