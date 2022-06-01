import { fetchAPI } from "src/core/network/api/common";

type Request = {
	name: string;
	author_ids: string[];
};

type Response = {
	dialog_id: string;
};

export const apiMessengerCreateDialog = (dto: Request) => fetchAPI.post<Response>("/api/messenger/create", dto);
