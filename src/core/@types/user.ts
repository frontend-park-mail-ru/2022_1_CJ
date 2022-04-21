export type UserName = {
	first: string;
	last: string;
};

export type User = {
	id: string;
	email: string;
	name: UserName;
	image: string;
};
