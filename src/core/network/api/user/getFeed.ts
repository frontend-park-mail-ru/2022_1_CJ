import { PaginationParameters, PaginationResponse } from "src/core/@types/paramaters";
import { PostWrapper } from "src/core/@types/post";
import { fetchAPI, withQuery } from "src/core/network/api/common";

type Response = PaginationResponse & {
	posts: PostWrapper[];
};

export const apiUserGetFeed = (dto?: PaginationParameters) => fetchAPI.get<Response>(withQuery("/api/user/feed", dto));
