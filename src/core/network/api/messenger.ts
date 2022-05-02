import {
	CreateDialogRequest,
	CreateDialogResponse,
	GetDialogRequest,
	GetDialogResponse,
	GetDialogsResponse,
} from "../dto/messenger";
import { fetchAPI, withQuery, ws } from "./common";

const methods = {
	createDialog: "/api/messenger/create",
	getDialogs: "/api/messenger/dialogs",
	getDialog: "/api/messenger/get",
	wsConnection: "/api/messenger/ws",
};

const createDialog = (dto: CreateDialogRequest) =>
	fetchAPI.post<CreateDialogRequest, CreateDialogResponse>(methods.createDialog, dto);

const getDialogs = () => fetchAPI.get<GetDialogsResponse>(methods.getDialogs);

const getDialog = (dto: GetDialogRequest) => fetchAPI.get<GetDialogResponse>(withQuery(methods.getDialog, dto));

const openWSConnection = () => {
	const socket = ws("ws://localhost:8080/api/messenger/ws");

	socket.onopen = () => {
		console.log("Successfully Connected");
	};

	socket.onmessage = function () {
		console.log(arguments);
	};

	socket.onclose = (event) => {
		console.log("Socket Closed Connection: ", event);
	};

	socket.onerror = (error) => {
		console.log("Socket Error: ", error);
	};

	return socket;
};

export const messengerAPI = {
	createDialog,
	getDialogs,
	getDialog,
	openWSConnection,
};
