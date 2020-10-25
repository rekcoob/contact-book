interface IAlert {
	id: number;
	msg: string;
	type: string;
}

export type AlertStateType = {
	alerts: IAlert[];
	setAlert: (msg: string, type: string, timeout?: number) => void;
};

export type AlertActions =
	| { type: 'SET_ALERT'; payload: { msg: string; type: string; id: number } }
	| { type: 'REMOVE_ALERT'; payload: number };

export enum ACTIONS {
	SET_ALERT = 'SET_ALERT',
	REMOVE_ALERT = 'REMOVE_ALERT',
}
