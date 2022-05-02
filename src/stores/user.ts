import { treact } from "@treact";
import { User } from "src/core/@types/user";

export enum UserStatus {
	Unset,
	Authorized,
	Unauthorized,
}

export type UserStore = {
	user: User;
	status: UserStatus;
	friends: string[];
	followers: string[];
	subscriptions: string[];
};

const initialState: UserStore = {
	user: null,
	status: UserStatus.Unset,
	friends: [],
	followers: [],
	subscriptions: [],
};

export const useUserStore = treact.createStore(initialState);
