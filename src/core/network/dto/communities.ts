import { Community, CommunityShort } from "src/core/@types/community";
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
	images?: string[];
	attachments?: string[];
};

export type CreateCommunityPostResponse = BasicResponse;

export type GetCommunityPostsRequest = {
	community_id: string;
};

export type GetCommunityPostsResponse = {
	posts: PostWrapper[];
};

export type SearchCommunitiesRequest = {
	selector: string;
};

export type SearchCommunitiesResponse = {
	communities: CommunityShort[];
};

export type EditCommunityRequest = {
	community_id: string;
	name?: string;
	image?: string;
	info?: string;
	admins?: string[];
};

export type EditCommunityResponse = BasicResponse;

export type DeleteCommunityRequest = {
	community_id: string;
};

export type DeleteCommunityResponse = BasicResponse;

export type UpdateCommunityPhotoRequest = {
	data: FormData;
	community_id: string;
};

export type UpdateCommunityPhotoResponse = {
	url: string;
};

export type ListCommunitiesRequest = {
	user_id: string;
};

export type ListCommunitiesResponse = {
	communities: CommunityShort[];
};

export type JoinCommunityRequest = {
	community_id: string;
};

export type JoinCommunityResponse = BasicResponse;

export type LeaveCommunityRequest = {
	community_id: string;
};

export type LeaveCommunityResponse = BasicResponse;

export type GetManagedCommunitiesRequest = {
	user_id: string;
};

export type GetManagedCommunitiesResponse = {
	communities: CommunityShort[];
};

export type EditCommunityPostRequest = {
	community_id: string;
	post_id: string;
	message?: string;
	images?: string[];
	attachments?: string[];
};

export type EditCommunityPostResponse = BasicResponse;

export type DeleteCommunityPostRequest = {
	community_id: string;
	post_id: string;
};

export type DeleteCommunityPostResponse = BasicResponse;
