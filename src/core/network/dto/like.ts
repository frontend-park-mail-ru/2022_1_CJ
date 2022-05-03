import { Likes } from "src/core/@types/likes";
import { BasicResponse } from "src/core/network/dto/common";

export type IncreaseLikeRequest = {
	post_id?: string;
	photo_id?: string;
};

export type IncreaseLikeResponse = BasicResponse;

export type ReduceLikeRequest = {
	post_id?: string;
	photo_id?: string;
};

export type ReduceLikeResponse = BasicResponse;

export type GetPostLikesRequest = {
	post_id: string;
};

export type GetPostLikesResponse = {
	likes: Likes;
};
