import { fetchAPI, withQuery } from "src/core/network/api/common";

type Request = {
	community_id: string;
};

export const apiCommunitiesJoin = (dto: Request) => fetchAPI.get<Request>(withQuery("/api/communities/join", dto));
