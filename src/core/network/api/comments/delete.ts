import { fetchAPI } from "src/core/network/api/common";
import { BasicResponse } from "src/core/network/dto/common";

type DeleteCommentRequest = {
	post_id: string;
	comment_id: string;
};

type DeleteCommentResponse = BasicResponse;

export const deleteComment = (dto: DeleteCommentRequest) =>
	fetchAPI.post<DeleteCommentResponse>("/api/comment/delete", dto);
