import { fetchAPI, withQuery } from "src/core/network/api/common";

type Request = {
	community_id: string;
};

export const apiCommunitiesDelete = (dto: Request) => fetchAPI.delete(withQuery("/api/communities/delete", dto));
