import { fetchAPI } from "src/core/network/api/common";

type Request = {
	post_id: string;
	message?: string;
	images?: string[];
	attachments?: string[];
};

export const apiPostEditPost = (dto: Request) => fetchAPI.put("/api/post/edit", dto);
