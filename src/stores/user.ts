import { treact } from "@treact";
import { CommunityShort } from "src/core/@types/community";
import { User } from "src/core/@types/user";
import { apiFriendsGet } from "src/core/network/api/friends/get";
import { apiFriendsGetIncomingRequests } from "src/core/network/api/friends/getIncomingRequests";
import { apiFriendsGetOutcomingRequests } from "src/core/network/api/friends/getOutcomingRequests";

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
	user: {} as User,
	status: UserStatus.Unset,

	friends: [],
	incomingRequests: [],
	outcomingRequests: [],

	managedCommunities: [],
};

export const [useUserStore, modUserStore] = treact.createStore(userStoreInitialState);

export const updateFriendsState = () =>
	Promise.all([
		apiFriendsGet().then((response) => response.friend_ids || []),
		apiFriendsGetIncomingRequests().then((response) => response.request_ids || []),
		apiFriendsGetOutcomingRequests().then((response) => response.request_ids || []),
	]).then(([friends, incomingRequests, outcomingRequests]) => {
		modUserStore.update({ friends, incomingRequests, outcomingRequests });
	});
