import { treact } from "@treact";
import { Dialog, Message } from "src/core/@types/dialog";
import { EventWithTarget } from "src/core/@types/event";
import { messengerAPI, WSReducer } from "src/core/network/api/messenger";
import { Spinner } from "src/components/spinner";
import { decodeEntity } from "src/components/@helpers/utils";
import { User } from "src/core/@types/user";
import { fetchUsers } from "src/components/@helpers/user";
import { UserProfileLink } from "src/components/@helpers/links";
import { useUserStore } from "src/stores/user";
import { fromTimestamp } from "src/components/@helpers/time";
import { Component } from "src/core/treact/models";

export const DialogComponent: Component = ({ dialog_id }: { dialog_id: string }) => {
	const [userStore] = useUserStore();

	const [dialog, setDialog] = treact.useState(null as Dialog);
	const [messages, setMessages] = treact.useState(null as Message[]);
	const [participants, setParticipants] = treact.useState(null as { [key: string]: User });
	const [socket, setSocket] = treact.useState(null as WebSocket);

	treact.useEffect(async () => {
		const response = await messengerAPI.getDialog({ dialog_id });
		setDialog(response.dialog);
		setMessages(response.messages || []);
		fetchUsers(response.dialog.participants).then((users) => {
			const mapping = Object.fromEntries(users.map((user) => [user.id, user]));
			setParticipants(mapping);
		});
	}, []);

	if (participants && dialog && messages) {
		const wsReducer: WSReducer = {
			onopen() {
				setSocket(this);
				this.send(JSON.stringify({ dialog_id, event: "join" }));
			},
			onmessage: (event) => {
				const data = JSON.parse(event.data);
				if (data.event === "send") {
					const message: Message = {
						body: data.body,
						author_id: data.author_id,
						created_at: data.created_at,
					};
					messages.unshift(message);
					setMessages(messages);
				}
			},
		};

		treact.useEffect(() => {
			messengerAPI.openWSConnection(wsReducer);
		}, []);
	}

	if (socket && participants && dialog && messages) {
		const mapMessage = (message: Message) => {
			const author = participants[message.author_id] || userStore.user;
			const isAuthor = author.id === userStore.user.id;
			const style = isAuthor ? "align-self: flex-end" : "align-self: flex-start";
			return (
				<div className="flex flex-c bg-white pd-8 border-sm" style={style}>
					<span>
						<UserProfileLink user={author} />
						<p className="text-light">{fromTimestamp(message.created_at)}</p>
					</span>
					<p className="flex break-word">{decodeEntity(message.body)}</p>
				</div>
			);
		};

		const sendMessage = (event: EventWithTarget<HTMLInputElement, KeyboardEvent>) => {
			if (event.key === "Enter") {
				const body = event.target.innerText.trim();
				if (body.length === 0) {
					event.preventDefault();
				} else if (event.shiftKey) {
					event.preventDefault();
					event.target.innerText = "";
					socket.send(JSON.stringify({ dialog_id, body, event: "send" }));
				}
			}
		};

		return (
			<div className="flex flex-c grow justify-between">
				<p className="d-middle bg-white pd-4 border-sm">{dialog.name}</p>
				<div className="dialog flex flex-cr grow overflow">{messages.map(mapMessage)}</div>
				<div className="flex flex-c">
					<div className="helper helper-hint pd-1">Send with [shift + enter]</div>
					<div onKeyDown={sendMessage} className="grow bg-white break-word" style="max-height: 8rem;" contentEditable />
				</div>
			</div>
		);
	}

	return <Spinner />;
};
