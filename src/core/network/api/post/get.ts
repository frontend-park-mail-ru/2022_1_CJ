import { PostWrapper } from "src/core/@types/post";
import { fetchAPI, withQuery } from "src/core/network/api/common";

export type Request = {
	post_id: string;
};

export type GetPostResponse = PostWrapper;

export const apiPostGetPost = (dto: Request) => fetchAPI.get<GetPostResponse>(withQuery("/api/post/get", dto));
