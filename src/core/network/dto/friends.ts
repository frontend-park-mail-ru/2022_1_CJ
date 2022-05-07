import { BasicResponse } from "./common";

export type SendFriendRequestRequest = {
	to: string;
};
export type SendFriendRequestResponse = BasicResponse;

export type RevokeFriendRequestRequest = {
	to: string;
};
export type RevokeFriendRequestResponse = BasicResponse;

export type AcceptFriendRequestRequest = {
	from: string;
};
export type AcceptFriendRequestResponse = BasicResponse;

export type GetFriendsRequest = {};
export type GetFriendsResponse = {
	friend_ids: string[];
};

export type DeleteFriendRequest = {
	friend_id: string;
};
export type DeleteFriendResponse = BasicResponse;

export type GetIncomingRequestsRequest = {};
export type GetIncomingRequestsResponse = {
	request_ids: string[];
};

export type GetOutcomingRequestsRequest = {};
export type GetOutcomingRequestsResponse = {
	request_ids: string[];
};
