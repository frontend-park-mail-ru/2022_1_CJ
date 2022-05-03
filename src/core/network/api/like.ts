import { fetchAPI, withQuery } from "src/core/network/api/common";
import {
	GetPostLikesRequest,
	GetPostLikesResponse,
	IncreaseLikeRequest,
	IncreaseLikeResponse,
	ReduceLikeRequest,
	ReduceLikeResponse,
} from "src/core/network/dto/like";

const methods = {
	increase: "/api/like/increase",
	reduce: "/api/like/reduce",
	getPostLikes: "/api/like/post/get",
};

const increase = (dto: IncreaseLikeRequest) =>
	fetchAPI.post<IncreaseLikeRequest, IncreaseLikeResponse>(methods.increase, dto);

const reduce = (dto: ReduceLikeRequest) => fetchAPI.post<ReduceLikeRequest, ReduceLikeResponse>(methods.reduce, dto);

const getPostLikes = (dto: GetPostLikesRequest) =>
	fetchAPI.get<GetPostLikesResponse>(withQuery(methods.getPostLikes, dto));

export const likeAPI = {
	increase,
	reduce,
	getPostLikes,
};
