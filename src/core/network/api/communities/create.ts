import { fetchAPI } from "src/core/network/api/common";

export type CreateCommunityRequest = {
	name: string;
	image: string;
	info: string;
	admins?: string[];
};

export const apiCommunitiesCreate = (dto: CreateCommunityRequest) => fetchAPI.post("/api/communities/create", dto);
