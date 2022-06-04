import { Likes } from "src/core/@types/likes";
import { fetchAPI, withQuery } from "src/core/network/api/common";

type Request = {
	post_id: string;
};

type Response = {
	likes: Likes;
};

export const apiLikesGet = (dto: Request) => fetchAPI.get<Response>(withQuery("/api/like/post/get", dto));
