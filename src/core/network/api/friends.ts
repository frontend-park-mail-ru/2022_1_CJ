import { fetchAPI, withQuery } from "src/core/network/api/common";
import {
	AcceptFriendRequestRequest,
	AcceptFriendRequestResponse,
	DeleteFriendRequest,
	DeleteFriendResponse,
	GetFriendsRequest,
	GetFriendsResponse,
	GetIncomingRequestsResponse,
	GetOutcomingRequestsResponse,
	RevokeFriendRequestRequest,
	RevokeFriendRequestResponse,
	SendFriendRequestRequest,
	SendFriendRequestResponse,
} from "src/core/network/dto/friends";

const methods = {
	sendRequest: "/api/friends/request/send",
	revokeRequest: "/api/friends/request/revoke",
	acceptRequest: "/api/friends/request/accept",
	getFriends: "/api/friends/get",
	deleteFriend: "/api/friends/delete",
	getIncomingFriendRequests: "/api/friends/requests/incoming",
	getOutcomingFriendRequests: "/api/friends/requests/outcoming",
};

const sendRequest = (dto: SendFriendRequestRequest) =>
	fetchAPI.post<SendFriendRequestResponse>(methods.sendRequest, dto);

const revokeRequest = (dto: RevokeFriendRequestRequest) =>
	fetchAPI.post<RevokeFriendRequestResponse>(methods.revokeRequest, dto);

const acceptRequest = (dto: AcceptFriendRequestRequest) =>
	fetchAPI.post<AcceptFriendRequestResponse>(methods.acceptRequest, dto);

const getFriends = (dto?: GetFriendsRequest) => fetchAPI.get<GetFriendsResponse>(withQuery(methods.getFriends, dto));

const deleteFriend = (dto: DeleteFriendRequest) =>
	fetchAPI.delete<DeleteFriendResponse>(withQuery(methods.deleteFriend, dto));

const getIncomingFriendRequests = () => fetchAPI.get<GetIncomingRequestsResponse>(methods.getIncomingFriendRequests);

const getOutcomingFriendRequests = () => fetchAPI.get<GetOutcomingRequestsResponse>(methods.getOutcomingFriendRequests);

export const friendsAPI = {
	sendRequest,
	revokeRequest,
	acceptRequest,
	getFriends,
	deleteFriend,
	getIncomingFriendRequests,
	getOutcomingFriendRequests,
};
