import { fetchAPI, withQuery } from "src/core/network/api/common";

type Request = {
	community_id: string;
};

export const apiCommunitiesLeave = (dto: Request) => fetchAPI.get(withQuery("/api/communities/leave", dto));
