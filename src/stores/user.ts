import { treact } from "@treact";
import { CommunityShort } from "src/core/@types/community";
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
	incomingRequests: string[];
	outcomingRequests: string[];

	managedCommunities: CommunityShort[];
};

export const userStoreInitialState: UserStore = {
	user: null,
	status: UserStatus.Unset,

	friends: [],
	incomingRequests: [],
	outcomingRequests: [],

	managedCommunities: [],
};

export const useUserStore = treact.createStore(userStoreInitialState);
