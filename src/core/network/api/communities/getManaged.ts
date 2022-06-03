import { CommunityShort } from "src/core/@types/community";
import { fetchAPI, withQuery } from "src/core/network/api/common";

type Request = {
	user_id: string;
};

type Response = {
	communities: CommunityShort[];
};

export const apiCommunitiesGetManaged = (dto: Request) =>
	fetchAPI.get<Response>(withQuery("/api/communities/managed_list", dto));
