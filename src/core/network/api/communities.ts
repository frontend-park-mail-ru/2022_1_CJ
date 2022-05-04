import { fetchAPI, withQuery } from "src/core/network/api/common";
import {
	CreateCommunityPostRequest,
	CreateCommunityPostResponse,
	CreateCommunityRequest,
	CreateCommunityResponse,
	DeleteCommunityRequest,
	DeleteCommunityResponse,
	EditCommunityRequest,
	EditCommunityResponse,
	GetCommunityPostsRequest,
	GetCommunityPostsResponse,
	GetCommunityRequest,
	GetCommunityResponse,
	SearchCommunitiesRequest,
	SearchCommunitiesResponse,
} from "src/core/network/dto/communities";

const methods = {
	create: "/api/communities/create",
	get: "/api/communities/get",
	createPost: "/api/communities/post/create",
	getPosts: "/api/communities/posts",
	search: "/api/communities/search",
	edit: "/api/communities/edit",
	delete: "/api/communities/delete",
};

const createCommunity = (dto: CreateCommunityRequest) =>
	fetchAPI.post<CreateCommunityRequest, CreateCommunityResponse>(methods.create, dto);

const getCommunity = (dto: GetCommunityRequest) => fetchAPI.get<GetCommunityResponse>(withQuery(methods.get, dto));

const createCommunityPost = (dto: CreateCommunityPostRequest) =>
	fetchAPI.post<CreateCommunityPostRequest, CreateCommunityPostResponse>(methods.createPost, dto);

const getCommunityPosts = (dto: GetCommunityPostsRequest) =>
	fetchAPI.get<GetCommunityPostsResponse>(withQuery(methods.getPosts, dto));

const searchCommunities = (dto: SearchCommunitiesRequest) =>
	fetchAPI.get<SearchCommunitiesResponse>(withQuery(methods.search, dto));

const editCommunity = (dto: EditCommunityRequest) =>
	fetchAPI.put<EditCommunityRequest, EditCommunityResponse>(methods.delete, dto);

const deleteCommunity = (dto: DeleteCommunityRequest) =>
	fetchAPI.delete<DeleteCommunityResponse>(withQuery(methods.delete, dto));

export const communitiesAPI = {
	createCommunity,
	getCommunity,
	createCommunityPost,
	getCommunityPosts,
	searchCommunities,
	editCommunity,
	deleteCommunity,
};
