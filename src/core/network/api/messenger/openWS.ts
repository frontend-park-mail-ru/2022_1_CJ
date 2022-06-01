import { ws } from "src/core/network/api/common";

export type WSReducer = {
	onopen?: WebSocket["onopen"];
	onmessage?: WebSocket["onmessage"];
	onclose?: WebSocket["onclose"];
	onerror?: WebSocket["onerror"];
};

export const apiMessengerOpenWS = (reducer: WSReducer) => {
	const scheme = location.protocol === "https:" ? "wss" : "ws";
	const socket = ws(`${scheme}://${location.hostname}/api/messenger/ws`);

	socket.onopen = reducer.onopen;
	socket.onmessage = reducer.onmessage;
	socket.onclose = reducer.onclose;
	socket.onerror = reducer.onerror;

	return socket;
};
