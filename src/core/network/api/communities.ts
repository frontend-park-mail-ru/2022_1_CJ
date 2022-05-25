import { fetchAPI, withQuery } from "src/core/network/api/common";
import {
	CreateCommunityPostRequest,
	CreateCommunityPostResponse,
	CreateCommunityRequest,
	CreateCommunityResponse,
	DeleteCommunityPostRequest,
	DeleteCommunityPostResponse,
	DeleteCommunityRequest,
	DeleteCommunityResponse,
	EditCommunityPostRequest,
	EditCommunityPostResponse,
	EditCommunityRequest,
	EditCommunityResponse,
	GetCommunityPostsRequest,
	GetCommunityPostsResponse,
	GetCommunityRequest,
	GetCommunityResponse,
	GetManagedCommunitiesRequest,
	GetManagedCommunitiesResponse,
	JoinCommunityRequest,
	LeaveCommunityRequest,
	LeaveCommunityResponse,
	ListCommunitiesRequest,
	ListCommunitiesResponse,
	SearchCommunitiesRequest,
	SearchCommunitiesResponse,
	UpdateCommunityPhotoRequest,
	UpdateCommunityPhotoResponse,
} from "src/core/network/dto/communities";

const methods = {
	create: "/api/communities/create",
	get: "/api/communities/get",
	createPost: "/api/communities/post/create",
	getPosts: "/api/communities/posts",
	search: "/api/communities/search",
	edit: "/api/communities/edit",
	delete: "/api/communities/delete",
	updatePhoto: "/api/communities/update_photo",
	list: "/api/communities/list",
	join: "/api/communities/join",
	leave: "/api/communities/leave",
	getManagedCommunities: "/api/communities/managed_list",
	editPost: "/api/communities/post/edit",
	deletePost: "/api/communities/post/delete",
};

const createCommunity = (dto: CreateCommunityRequest) => fetchAPI.post<CreateCommunityResponse>(methods.create, dto);

const getCommunity = (dto: GetCommunityRequest) => fetchAPI.get<GetCommunityResponse>(withQuery(methods.get, dto));

const createCommunityPost = (dto: CreateCommunityPostRequest) =>
	fetchAPI.post<CreateCommunityPostResponse>(methods.createPost, dto);

const getCommunityPosts = (dto: GetCommunityPostsRequest) =>
	fetchAPI.get<GetCommunityPostsResponse>(withQuery(methods.getPosts, dto));

const searchCommunities = (dto: SearchCommunitiesRequest) =>
	fetchAPI.get<SearchCommunitiesResponse>(withQuery(methods.search, dto));

const editCommunity = (dto: EditCommunityRequest) => fetchAPI.put<EditCommunityResponse>(methods.edit, dto);

const deleteCommunity = (dto: DeleteCommunityRequest) =>
	fetchAPI.delete<DeleteCommunityResponse>(withQuery(methods.delete, dto));

const updatePhoto = (dto: UpdateCommunityPhotoRequest) =>
	fetchAPI.postFormData<UpdateCommunityPhotoResponse>(
		withQuery(methods.updatePhoto, { community_id: dto.community_id }),
		dto.data
	);

const list = (dto?: ListCommunitiesRequest) => fetchAPI.get<ListCommunitiesResponse>(withQuery(methods.list, dto));

const join = (dto: JoinCommunityRequest) => fetchAPI.get<JoinCommunityRequest>(withQuery(methods.join, dto));

const leave = (dto: LeaveCommunityRequest) => fetchAPI.get<LeaveCommunityResponse>(withQuery(methods.leave, dto));

const getManagedCommunities = (dto: GetManagedCommunitiesRequest) =>
	fetchAPI.get<GetManagedCommunitiesResponse>(withQuery(methods.getManagedCommunities, dto));

const editPost = (dto: EditCommunityPostRequest) => fetchAPI.put<EditCommunityPostResponse>(methods.editPost, dto);

const deletePost = (dto: DeleteCommunityPostRequest) =>
	fetchAPI.delete<DeleteCommunityPostResponse>(withQuery(methods.deletePost, dto));

export const communitiesAPI = {
	createCommunity,
	getCommunity,
	createCommunityPost,
	getCommunityPosts,
	searchCommunities,
	editCommunity,
	deleteCommunity,
	updatePhoto,
	list,
	join,
	leave,
	getManagedCommunities,
	editPost,
	deletePost,
};
