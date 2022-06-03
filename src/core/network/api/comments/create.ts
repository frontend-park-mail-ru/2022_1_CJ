import { fetchAPI } from "src/core/network/api/common";

type Request = {
	post_id: string;
	message: string;
	images?: string[];
};

export const createComment = (dto: Request) => fetchAPI.post("/api/comment/create", dto);
