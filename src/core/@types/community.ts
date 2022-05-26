import { User } from "src/core/@types/user";

export type CommunityShort = {
	id: string;
	name: string;
	info: string;
	image: string;
};

export type Community = CommunityShort & {
	info: string;
	followers: number;
	admins: User[];
};
