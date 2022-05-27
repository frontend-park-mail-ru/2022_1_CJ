import { fetchAPI, withQuery } from "src/core/network/api/common";

type Request = {
	id: string;
	first_name: string;
	last_name: string;
	photo_url: string;
	hash: string;
};

export const AuthenticateThroguhTelegram = (dto: Request) => fetchAPI.get(withQuery("/api/oauth/telegram", dto));
