import { fetchAPI, withQuery } from "src/core/network/api/common";

type Request = {
	user_id: string;
};

type Response = {
	dialog_id: string;
};

export const apiMessengerGetDialogIDByUserID = (dto: Request) =>
	fetchAPI.get<Response>(withQuery("/api/messenger/user_dialog", dto));
