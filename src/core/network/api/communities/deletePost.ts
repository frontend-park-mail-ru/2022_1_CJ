import { fetchAPI, withQuery } from "src/core/network/api/common";

type Request = {
	community_id: string;
	post_id: string;
};

export const apiCommunitiesDeletePost = (dto: Request) =>
	fetchAPI.delete(withQuery("/api/communities/post/delete", dto));
