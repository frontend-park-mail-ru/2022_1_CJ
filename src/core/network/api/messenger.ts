import { GetDialogsResponse } from "../dto/messenger";
import { fetchAPI } from "./common";

const methods = {
	getDialogs: "/api/messenger/dialogs",
};

const getDialogs = () => fetchAPI.get<GetDialogsResponse>(methods.getDialogs);

export const messengerAPI = {
	getDialogs,
};
