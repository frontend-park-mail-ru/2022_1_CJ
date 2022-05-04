import { BasicResponse } from "./common";

export type GetFriendsResponse = {
	friend_ids: string[];
};

export type GetIncomingFriendReqsResponse = {
	request_ids: string[];
};

export type GetOutcomingFriendReqsResponse = {
	request_ids: string[];
};

export type SendFriendReqRequest = {
	user_id: string;
};

export type SendFriendReqResponse = BasicResponse;

export type AcceptFriendReqRequest = {
	user_id: string;
	is_accepted: boolean;
};

export type AcceptFriendReqResponse = BasicResponse;

export type DeleteFriendRequest = {
	ex_friend_id: string;
};

export type DeleteFriendResponse = {
	friend_ids: string[];
};
