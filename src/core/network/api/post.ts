import {
	CreatePostRequest,
	CreatePostResponse,
	GetPostRequest,
	GetPostResponse,
	DeletePostRequest,
	DeletePostResponse,
} from "src/core/network/dto/post";
import { fetchAPI, withQuery } from "src/core/network/api/common";

const methods = {
	createPost: "/api/post/create",
	getPost: "/api/post/get",
	editPost: "/api/post/edit",
	deletePost: "/api/post/delete",
};

const createPost = (dto: CreatePostRequest) => fetchAPI.post<CreatePostResponse>(methods.createPost, dto);

const getPost = (dto: GetPostRequest) => fetchAPI.get<GetPostResponse>(withQuery(methods.getPost, dto));

const deletePost = (dto: DeletePostRequest) => fetchAPI.delete<DeletePostResponse>(withQuery(methods.deletePost, dto));

export const postAPI = {
	createPost,
	getPost,
	deletePost,
};
