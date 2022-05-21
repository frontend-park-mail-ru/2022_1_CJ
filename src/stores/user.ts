import { treact } from "@treact";
import { CommunityShort } from "src/core/@types/community";
import { User } from "src/core/@types/user";
import { friendsAPI } from "src/core/network/api/friends";

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

export const [useUserStore, modUserStore] = treact.createStore(userStoreInitialState);

export const updateFriendsState = () =>
	Promise.all([
		friendsAPI.getFriends().then((response) => response.friend_ids || []),
		friendsAPI.getIncomingFriendRequests().then((response) => response.request_ids || []),
		friendsAPI.getOutcomingFriendRequests().then((response) => response.request_ids || []),
	]).then(([friends, incomingRequests, outcomingRequests]) => {
		modUserStore.update({ friends, incomingRequests, outcomingRequests });
	});
