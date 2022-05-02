import { treact } from "@treact";
import { Message } from "src/core/@types/dialog";
import { EventWithTarget } from "src/core/@types/event";
import { messengerAPI } from "src/core/network/api/messenger";
import { Component } from "./@types/component";
import { Spinner } from "./spinner";

const decodeEntity = (str: string) => {
	var textarea = document.createElement("textarea");
	textarea.innerHTML = str;
	return textarea.value;
};

const initialState = {
	socket: null as WebSocket,
	messages: null as Message[],
};

export const Dialog: Component = ({ dialog_id }: { dialog_id: string }) => {
	const [state, setState] = treact.useState(initialState);

	treact.useEffect(() => {
		Promise.allSettled([
			messengerAPI.getDialog({ dialog_id }).then((response) => (state.messages = response.messages || [])),
			setTimeout(() => (state.socket = messengerAPI.openWSConnection())),
		]).then(() => setState(state));
	}, []);

	const map = (message: Message) => (
		<div className="flex flex-c bg-white">
			<p>{message.author_id}</p>
			<p>{decodeEntity(message.body)}</p>
		</div>
	);

	const sendMessage = (event: EventWithTarget<HTMLInputElement, KeyboardEvent>) => {
		if (event.key !== "Enter") {
			return;
		}

		const body = event.target.value;
		state.socket.send(JSON.stringify({ dialog_id, body, event: "send" }));
	};

	if (state.socket && state.messages) {
		return (
			<div className="flex flex-c">
				{state.messages.map(map)}
				<input onKeyUp={sendMessage} type="text" className="input-field" placeholder="Type a message" />
			</div>
		);
	}

	return <Spinner />;
};
