import { User } from "src/core/@types/user";

export type GetUserDataRequest = {
	user_id: string;
};

export type GetUserDataResponse = {
	user: User;
};
