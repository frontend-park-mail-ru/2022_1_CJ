import { Community } from "src/core/@types/community";
import { PostWrapper } from "src/core/@types/post";
import { BasicResponse } from "src/core/network/dto/common";

export type CreateCommunityRequest = {
	name: string;
	image: string;
	info: string;
	admins?: string[];
};

export type CreateCommunityResponse = BasicResponse;

export type GetCommunityRequest = {
	community_id: string;
};

export type GetCommunityResponse = {
	community: Community;
};

export type CreateCommunityPostRequest = {
	community_id: string;
	message: string;
	images: string[];
};

export type CreateCommunityPostResponse = BasicResponse;

export type GetCommunityPostsRequest = {
	community_id: string;
};

export type GetCommunityPostsResponse = {
	posts: PostWrapper[];
};
