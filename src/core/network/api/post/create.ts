import { fetchAPI } from "src/core/network/api/common";

type Request = {
	message: string;
	images?: string[];
	attachments?: string[];
};

export const apiPostCreatePost = (dto: Request) => fetchAPI.post("/api/post/create", dto);
