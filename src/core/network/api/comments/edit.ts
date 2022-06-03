import { fetchAPI } from "src/core/network/api/common";

type EditCommentRequest = {
	post_id: string;
	comment_id: string;
	message?: string;
	images?: string[];
};

export const editComment = (dto: EditCommentRequest) => fetchAPI.put("/api/comment/edit", dto);
