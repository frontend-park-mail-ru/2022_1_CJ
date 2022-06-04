import { Community } from "src/core/@types/community";
import { fetchAPI, withQuery } from "src/core/network/api/common";

type Request = {
	community_id: string;
};

type Response = {
	community: Community;
};

export const apiCommunitiesGet = (dto: Request) => fetchAPI.get<Response>(withQuery("/api/communities/get", dto));
