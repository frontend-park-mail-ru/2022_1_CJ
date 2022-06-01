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

	if (reducer.onopen) {
		socket.onopen = reducer.onopen;
	}

	if (reducer.onmessage) {
		socket.onmessage = reducer.onmessage;
	}

	if (reducer.onclose) {
		socket.onclose = reducer.onclose;
	}

	if (reducer.onerror) {
		socket.onerror = reducer.onerror;
	}

	return socket;
};
