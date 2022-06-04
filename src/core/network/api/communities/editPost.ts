import { fetchAPI } from "src/core/network/api/common";

type Request = {
	community_id: string;
	post_id: string;
	message?: string;
	images?: string[];
	attachments?: string[];
};

export const apiCommunitiesEditPost = (dto: Request) => fetchAPI.put("/api/communities/post/edit", dto);
