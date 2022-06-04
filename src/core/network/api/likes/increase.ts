import { fetchAPI } from "src/core/network/api/common";

type Request = {
	post_id?: string;
	photo_id?: string;
};

export const apiLikesIncrease = (dto: Request) => fetchAPI.post("/api/like/increase", dto);
