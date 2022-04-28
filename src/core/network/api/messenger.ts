import { CreateDialogRequest, CreateDialogResponse, GetDialogsResponse } from "../dto/messenger";
import { fetchAPI } from "./common";

const methods = {
	createDialog: "/api/messenger/create",
	getDialogs: "/api/messenger/dialogs",
};

const createDialog = (dto: CreateDialogRequest) =>
	fetchAPI.post<CreateDialogRequest, CreateDialogResponse>(methods.createDialog, dto);

const getDialogs = () => fetchAPI.get<GetDialogsResponse>(methods.getDialogs);

export const messengerAPI = {
	createDialog,
	getDialogs,
};
