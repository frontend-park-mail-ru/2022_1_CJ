import { Post } from "src/core/@types/post";
import { fetchAPI, withQuery } from "src/core/network/api/common";

type GetCommentRequest = {
	post_id: string;
};

type GetCommentResponse = {
	comments: Post[];
};

export const getComments = (dto: GetCommentRequest) =>
	fetchAPI.get<GetCommentResponse>(withQuery("/api/comment/get", dto));
