import { fetchAPI } from "src/core/network/api/common";

type DeleteCommentRequest = {
	post_id: string;
	comment_id: string;
};

export const deleteComment = (dto: DeleteCommentRequest) => fetchAPI.post("/api/comment/delete", dto);
