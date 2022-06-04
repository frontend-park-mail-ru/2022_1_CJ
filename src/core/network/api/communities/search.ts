import { CommunityShort } from "src/core/@types/community";
import { fetchAPI, withQuery } from "src/core/network/api/common";

type Request = {
	selector: string;
};

type Response = {
	communities: CommunityShort[];
};

export const apiCommunitiesSearch = (dto: Request) => fetchAPI.get<Response>(withQuery("/api/communities/search", dto));
