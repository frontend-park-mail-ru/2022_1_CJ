import { treact } from "@treact";
import { Message } from "src/core/@types/dialog";
import { EventWithTarget } from "src/core/@types/event";
import { messengerAPI, WSReducer } from "src/core/network/api/messenger";
import { Component } from "src/components/@types/component";
import { Spinner } from "src/components/spinner";

const decodeEntity = (str: string) => {
	var textarea = document.createElement("textarea");
	textarea.innerHTML = str;
	return textarea.value;
};

export const Dialog: Component = ({ dialog_id }: { dialog_id: string }) => {
	const [messages, setMessages] = treact.useState(null as Message[]);
	const [socket, setSocket] = treact.useState(null as WebSocket);

	const wsReducer: WSReducer = {
		onopen: function () {
			this.send(JSON.stringify({ dialog_id, event: "join" }));
			setSocket(this);
		},
		onmessage: function (ev) {
			console.log(ev.data);
		},
	};

	treact.useEffect(() => {
		messengerAPI.getDialog({ dialog_id }).then((response) => setMessages(response.messages || []));
		setTimeout(() => messengerAPI.openWSConnection(wsReducer));
	}, []);

	const map = (message: Message) => (
		<div className="flex flex-c bg-white pd-8">
			<p>{message.author_id}</p>
			<hr />
			<p>{decodeEntity(message.body)}</p>
		</div>
	);

	const sendMessage = (event: EventWithTarget<HTMLInputElement, KeyboardEvent>) => {
		if (event.key !== "Enter") {
			return;
		}

		const body = event.target.value;
		socket.send(JSON.stringify({ dialog_id, body, event: "send" }));
	};

	if (socket && messages) {
		return (
			<div className="flex flex-c d-middle">
				{messages.map(map)}
				<input onKeyUp={sendMessage} type="text" className="input-field" placeholder="Type a message" />
			</div>
		);
	}

	return <Spinner />;
};
