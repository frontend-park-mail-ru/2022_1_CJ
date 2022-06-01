import { PostWrapper } from "src/core/@types/post";
import { fetchAPI, withQuery } from "src/core/network/api/common";

export type Request = {
	user_id: string;
};

export type Response = {
	posts: PostWrapper[];
};

export const apiUserGetPosts = (dto?: Request) => fetchAPI.get<Response>(withQuery("/api/user/posts", dto));
