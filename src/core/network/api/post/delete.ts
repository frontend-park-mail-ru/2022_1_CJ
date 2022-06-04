import { fetchAPI, withQuery } from "src/core/network/api/common";

type Request = {
	post_id: string;
};

export const apiPostDeletePost = (dto: Request) => fetchAPI.delete(withQuery("/api/post/delete", dto));
