import { fetchAPI } from "src/core/network/api/common";

type Request = {
	community_id: string;
	name?: string;
	image?: string;
	info?: string;
	admins?: string[];
};

export const apiCommunitiesEdit = (dto: Request) => fetchAPI.put("/api/communities/edit", dto);
