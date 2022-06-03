import { fetchAPI } from "src/core/network/api/common";

type Request = {
	community_id: string;
	message: string;
	images?: string[];
	attachments?: string[];
};

export const apiCommunitiesCreatePost = (dto: Request) => fetchAPI.post("/api/communities/post/create", dto);
