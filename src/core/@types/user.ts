export type UserName = {
	first?: string;
	last?: string;
};

export type User = {
	id: string;
	email: string;
	name: UserName;
	image: string;
};

export type UserProfile = {
	id: string;
	email: string;
	name: UserName;
	avatar: string;
	phone: string;
	location: string;
	birth_day: string;
};

export type ProfileSettings = {
	name?: UserName;
	avatar?: string;
	phone?: string;
	location?: string;
	birth_day?: string;
};
