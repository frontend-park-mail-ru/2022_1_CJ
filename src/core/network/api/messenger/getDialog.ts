import { Dialog, Message } from "src/core/@types/dialog";
import { fetchAPI, withQuery } from "src/core/network/api/common";

type Request = {
	dialog_id: string;
};

type Response = {
	dialog: Dialog;
	messages: Message[];
};

export const apiMessengerGetDialog = (dto: Request) => fetchAPI.get<Response>(withQuery("/api/messenger/get", dto));
