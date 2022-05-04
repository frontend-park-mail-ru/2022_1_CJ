import {
	AcceptFriendReqRequest,
	AcceptFriendReqResponse,
	GetIncomingFriendReqsResponse,
	GetFriendsResponse,
	SendFriendReqRequest,
	SendFriendReqResponse,
	GetOutcomingFriendReqsResponse,
	DeleteFriendRequest,
	DeleteFriendResponse,
} from "src/core/network/dto/friends";
import { fetchAPI, withQuery } from "./common";

const methods = {
	getFriends: "/api/friends/get",
	getIncomingFriendRequests: "/api/friends/requests/incoming",
	getOutcomingFriendRequests: "/api/friends/requests/outcoming",
	sendFriendRequest: "/api/friends/request",
	acceptFriendRequest: "/api/friends/accept",
	delete: "/api/friends/delete",
};

const getFriends = () => fetchAPI.get<GetFriendsResponse>(methods.getFriends);

const getIncomingFriendRequests = () => fetchAPI.get<GetIncomingFriendReqsResponse>(methods.getIncomingFriendRequests);

const getOutcomingFriendRequests = () =>
	fetchAPI.get<GetOutcomingFriendReqsResponse>(methods.getOutcomingFriendRequests);

const sendFriendRequest = (dto: SendFriendReqRequest) =>
	fetchAPI.post<SendFriendReqRequest, SendFriendReqResponse>(methods.sendFriendRequest, dto);

const acceptFriendRequest = (dto: AcceptFriendReqRequest) =>
	fetchAPI.post<AcceptFriendReqRequest, AcceptFriendReqResponse>(methods.acceptFriendRequest, dto);

const deleteFriend = (dto: DeleteFriendRequest) =>
	fetchAPI.delete<DeleteFriendResponse>(withQuery(methods.delete, dto));

export const friendsAPI = {
	getFriends,
	getIncomingFriendRequests,
	getOutcomingFriendRequests,
	sendFriendRequest,
	acceptFriendRequest,
	deleteFriend,
};
