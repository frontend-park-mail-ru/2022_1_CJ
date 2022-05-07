import { Post } from "src/core/@types/post";
import { BasicResponse } from "src/core/network/dto/common";

export type CreatePostRequest = {
	message: string;
	images?: string[];
};

export type CreatePostResponse = BasicResponse;

export type GetPostRequest = {
	post_id: string;
};

export type GetPostResponse = {
	post: Post;
};

export type DeletePostRequest = {
	post_id: string;
};

export type DeletePostResponse = BasicResponse;
