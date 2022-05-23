import { fetchAPI } from "src/core/network/api/common";
import { BasicResponse } from "src/core/network/dto/common";

type EditCommentRequest = {
	post_id: string;
	comment_id: string;
	message?: string;
	images?: string[];
};

type EditCommentResponse = BasicResponse;

export const editComment = (dto: EditCommentRequest) => fetchAPI.put<EditCommentResponse>("/api/comment/edit", dto);
