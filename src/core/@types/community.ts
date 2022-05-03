import { User } from "src/core/@types/user";

export type Community = {
	id: string;
	name: string;
	image: string;
	info: string;
	followers: number;
	admins: User[];
};
