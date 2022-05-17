import { PostWrapper } from "src/core/@types/post";
import { BasicResponse } from "src/core/network/dto/common";

export type CreatePostRequest = {
	message: string;
	images?: string[];
};

export type CreatePostResponse = BasicResponse;

export type GetPostRequest = {
	post_id: string;
};

export type GetPostResponse = PostWrapper;

export type EditPostRequest = {
	post_id: string;
	message?: string;
	images?: string[];
};

export type EditPostResponse = BasicResponse;

export type DeletePostRequest = {
	post_id: string;
};

export type DeletePostResponse = BasicResponse;
