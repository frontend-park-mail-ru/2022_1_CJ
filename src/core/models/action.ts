export type Action = {
	type: string;
	payload: object;
};

export type Reaction = {
	type: string;
	listener: Function;
};

export const createAction = (type: string, payload: object): Action => ({ type, payload });

export const createReaction = (type: string, listener: Function): Reaction => ({ type, listener });
