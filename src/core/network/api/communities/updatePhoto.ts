import { fetchAPI, withQuery } from "src/core/network/api/common";

type Request = {
	data: FormData;
	community_id: string;
};

type Response = {
	url: string;
};

export const apiCommunitiesUpdatePhoto = (dto: Request) =>
	fetchAPI.postFormData<Response>(
		withQuery("/api/communities/update_photo", { community_id: dto.community_id }),
		dto.data
	);
