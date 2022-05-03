import {
	CreateDialogRequest,
	CreateDialogResponse,
	GetDialogIDByUserIDRequest,
	GetDialogIDByUserIDResponse,
	GetDialogRequest,
	GetDialogResponse,
	GetDialogsResponse,
} from "src/core/network/dto/messenger";
import { fetchAPI, withQuery, ws } from "./common";

export type WSReducer = {
	onopen?: WebSocket["onopen"];
	onmessage?: WebSocket["onmessage"];
	onclose?: WebSocket["onclose"];
	onerror?: WebSocket["onerror"];
};

const methods = {
	createDialog: "/api/messenger/create",
	getDialogs: "/api/messenger/dialogs",
	getDialog: "/api/messenger/get",
	getDialogIDByUserID: "/api/messenger/user_dialog",
	wsConnection: "/api/messenger/ws",
};

const createDialog = (dto: CreateDialogRequest) =>
	fetchAPI.post<CreateDialogRequest, CreateDialogResponse>(methods.createDialog, dto);

const getDialogs = () => fetchAPI.get<GetDialogsResponse>(methods.getDialogs);

const getDialog = (dto: GetDialogRequest) => fetchAPI.get<GetDialogResponse>(withQuery(methods.getDialog, dto));

const getDialogIDByUserID = (dto: GetDialogIDByUserIDRequest) =>
	fetchAPI.get<GetDialogIDByUserIDResponse>(withQuery(methods.getDialogIDByUserID, dto));

const openWSConnection = (reducer: WSReducer) => {
	const socket = ws("ws://localhost:8080/api/messenger/ws");

	socket.onopen = reducer.onopen;
	socket.onmessage = reducer.onmessage;
	socket.onclose = reducer.onclose;
	socket.onerror = reducer.onerror;

	return socket;
};

export const messengerAPI = {
	createDialog,
	getDialogs,
	getDialog,
	getDialogIDByUserID,
	openWSConnection,
};
