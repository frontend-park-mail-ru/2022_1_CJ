import { User } from "./user";

export type Post = {
	id: string;
	author: User;
	message: string;
	images: string[];
};
