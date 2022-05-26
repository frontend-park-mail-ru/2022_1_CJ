import { fetchAPI } from "src/core/network/api/common";
import { BasicResponse } from "src/core/network/dto/common";

type CreateCommentRequest = {
	post_id: string;
	message: string;
	images?: string[];
};

type CreateCommentResponse = BasicResponse;

export const createComment = (dto: CreateCommentRequest) =>
	fetchAPI.post<CreateCommentResponse>("/api/comment/create", dto);
