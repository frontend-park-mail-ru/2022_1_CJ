import { PostWrapper } from "src/core/@types/post";
import { fetchAPI, withQuery } from "src/core/network/api/common";

type Request = {
	user_id: string;
};

type Response = {
	posts: PostWrapper[];
};

export const apiUserGetPosts = (dto?: Request) => fetchAPI.get<Response>(withQuery("/api/user/posts", dto));
