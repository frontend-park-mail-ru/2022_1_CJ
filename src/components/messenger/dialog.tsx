import { treact } from "@treact";
import { Dialog, Message } from "src/core/@types/dialog";
import { EventWithTarget } from "src/core/@types/event";
import { messengerAPI, WSReducer } from "src/core/network/api/messenger";
import { Component } from "src/components/@types/component";
import { Spinner } from "src/components/spinner";
import { decodeEntity } from "src/components/@helpers/utils";
import { User } from "src/core/@types/user";
import { FetchUsers } from "src/components/@helpers/user";
import { UserProfileLink } from "src/components/@helpers/links";
import { useUserStore } from "src/stores/user";
import { fromTimestamp } from "src/components/@helpers/time";

// TODO: refactor; messages somehow comes into onmessage empty
export const DialogComponent: Component = ({ dialog_id }: { dialog_id: string }) => {
	const [userStore] = useUserStore();
	const [dialog, setDialog] = treact.useState(null as Dialog);
	const [messages, setMessages] = treact.useState([] as Message[]);
	const [participants, setParticipants] = treact.useState(null as { [key: string]: User });
	const [socket, setSocket] = treact.useState(null as WebSocket);

	const wsReducer: WSReducer = {
		onopen: function () {
			this.send(JSON.stringify({ dialog_id, event: "join" }));
			setSocket(this);
		},
		onmessage: (event) => {
			const data = JSON.parse(event.data);
			if (data.event === "send") {
				// const message: Message = {
				// 	body: data.body,
				// 	author_id: data.author_id,
				// 	created_at: data.created_at,
				// };
				messengerAPI.getDialog({ dialog_id }).then((response) => setMessages(response.messages || []));
			}
		},
	};

	treact.useEffect(async () => {
		const response = await messengerAPI.getDialog({ dialog_id });
		setDialog(response.dialog);
		setMessages(response.messages || []);
		FetchUsers(response.dialog.participants).then((users) => {
			const mapping = Object.fromEntries(users.map((user) => [user.id, user]));
			setParticipants(mapping);
		});
		setTimeout(() => messengerAPI.openWSConnection(wsReducer));
	}, []);

	const map = (message: Message) => {
		const author = participants[message.author_id] || userStore.user;
		return (
			<div className="flex flex-c bg-white pd-8 border-8">
				<div>
					<UserProfileLink user={author} />
					<p className="text-light">{fromTimestamp(message.created_at)}</p>
				</div>
				<p>{decodeEntity(message.body)}</p>
			</div>
		);
	};

	const sendMessage = (event: EventWithTarget<HTMLInputElement, KeyboardEvent>) => {
		const body = event.target.value;
		if (event.key !== "Enter" || body.length === 0) {
			return;
		}

		socket.send(JSON.stringify({ dialog_id, body, event: "send" }));
		messengerAPI.getDialog({ dialog_id }).then((response) => setMessages(response.messages || []));
		event.target.value = "";
	};

	if (socket && participants && dialog) {
		return (
			<div className="flex flex-c d-middle">
				<p className="d-middle bg-white pd-4 border-8">{dialog.name}</p>
				<div className="dialog flex flex-cr">{messages.map(map)}</div>
				<input onKeyUp={sendMessage} type="text" className="input-field" placeholder="Message..." />
			</div>
		);
	}

	return <Spinner />;
};
