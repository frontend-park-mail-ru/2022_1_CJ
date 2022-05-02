import {
	AcceptFriendReqRequest,
	AcceptFriendReqResponse,
	GetIncomingFriendReqsResponse,
	GetFriendsResponse,
	SendFriendReqRequest,
	SendFriendReqResponse,
} from "../dto/friends";
import { fetchAPI } from "./common";

const methods = {
	getFriends: "/api/friends/get",
	getIncomingFriendRequests: "/api/friends/requests/incoming",
	sendFriendRequest: "/api/friends/request",
	acceptFriendRequest: "/api/friends/accept",
};

const getFriends = () => fetchAPI.get<GetFriendsResponse>(methods.getFriends);

const getIncomingFriendRequests = () => fetchAPI.get<GetIncomingFriendReqsResponse>(methods.getIncomingFriendRequests);

const sendFriendRequest = (dto: SendFriendReqRequest) =>
	fetchAPI.post<SendFriendReqRequest, SendFriendReqResponse>(methods.sendFriendRequest, dto);

const acceptFriendRequest = (dto: AcceptFriendReqRequest) =>
	fetchAPI.post<AcceptFriendReqRequest, AcceptFriendReqResponse>(methods.acceptFriendRequest, dto);

export const friendsAPI = {
	getFriends,
	getIncomingFriendRequests,
	sendFriendRequest,
	acceptFriendRequest,
};
