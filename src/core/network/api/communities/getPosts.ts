import { PostWrapper } from "src/core/@types/post";
import { fetchAPI, withQuery } from "src/core/network/api/common";

type Request = {
	community_id: string;
};

type Response = {
	posts: PostWrapper[];
};

export const apiCommunitiesGetPosts = (dto: Request) =>
	fetchAPI.get<Response>(withQuery("/api/communities/posts", dto));
