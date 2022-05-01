import {
	AcceptFriendReqRequest,
	AcceptFriendReqResponse,
	GetFriendReqsResponse,
	GetFriendsResponse,
	SendFriendReqRequest,
	SendFriendReqResponse,
} from "../dto/friends";
import { fetchAPI } from "./common";

const methods = {
	getFriends: "/api/friends/get",
	getFriendRequests: "/api/friends/requests",
	sendFriendRequest: "/api/friends/request",
	acceptFriendRequest: "/api/friends/accept",
};

const getFriends = () => fetchAPI.get<GetFriendsResponse>(methods.getFriends);

const getFriendRequests = () => fetchAPI.get<GetFriendReqsResponse>(methods.getFriendRequests);

const sendFriendRequest = (dto: SendFriendReqRequest) =>
	fetchAPI.post<SendFriendReqRequest, SendFriendReqResponse>(methods.sendFriendRequest, dto);

const acceptFriendRequest = (dto: AcceptFriendReqRequest) =>
	fetchAPI.post<AcceptFriendReqRequest, AcceptFriendReqResponse>(methods.acceptFriendRequest, dto);

export const friendsAPI = {
	getFriends,
	getFriendRequests,
	sendFriendRequest,
	acceptFriendRequest,
};
