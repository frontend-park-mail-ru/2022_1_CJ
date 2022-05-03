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
	friends: User[];
	incomingRequests: User[];
	outcomingRequests: User[];
};

export const userStoreInitialState: UserStore = {
	user: null,
	status: UserStatus.Unset,
	friends: [],
	incomingRequests: [],
	outcomingRequests: [],
};

export const useUserStore = treact.createStore(userStoreInitialState);
