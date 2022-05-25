import { Component, treact } from "@treact";
import { DateFromTimestamp } from "src/components/@helpers/date";
import { UserProfileLink } from "src/components/@helpers/links";
import { isMobile } from "src/components/@helpers/mobile";
import { fetchUsers } from "src/components/@helpers/user";
import { decodeEntity } from "src/components/@helpers/utils";
import { AttachmentComponent } from "src/components/attachments/attachment";
import { getFileAttachments } from "src/components/attachments/file";
import { getImageAttachments } from "src/components/attachments/images";
import { PickerComponent } from "src/components/emoji/picker";
import { Link } from "src/components/link";
import { Spinner } from "src/components/spinner";
import { Routes, withParameters } from "src/constants/routes";
import { Dialog, Message } from "src/core/@types/dialog";
import { EventWithTarget } from "src/core/@types/event";
import { User } from "src/core/@types/user";
import { messengerAPI, WSReducer } from "src/core/network/api/messenger";
import { useUserStore } from "src/stores/user";

// TODO: refactor this crap
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
						attachments: data.attachments,
						images: data.images,
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
		const showAttachments = (attachments: string[]) => {
			const list = attachments.map((attachment) => (
				<a target="_blank" href={`/api/file/get?url=${attachment}`} className="link link-attachment d-middle">
					{attachment.slice(-10)}
				</a>
			));
			return <div className="flex flex-w fs-sm">{list}</div>;
		};

		const showImageAttachments = (images: string[]) => {
			return images.map((image) => <img style="width: 10rem;" className="border-sm" src={image} alt="" />);
		};

		const mapMessage = (message: Message) => {
			const author = participants[message.author_id] || userStore.user;
			const isAuthor = author.id === userStore.user.id;
			const style = isAuthor ? "align-self: flex-end;" : "align-self: flex-start;";
			return (
				<div className="flex flex-c bg-white pd-8 border-sm" style={style + "max-width: 50%;"}>
					<span>
						<UserProfileLink user={author} />
						<DateFromTimestamp timestamp={message.created_at} />
					</span>
					<p className="break-word pre-wrap">{decodeEntity(message.body)}</p>
					{message.images && showImageAttachments(message.images)}
					{message.attachments && showAttachments(message.attachments)}
				</div>
			);
		};

		const chatName = () => {
			if (dialog.participants.length === 1) {
				return <Link to={withParameters(Routes.Profile, { user_id: dialog.participants[0] })}>{dialog.name}</Link>;
			}
			return dialog.name;
		};

		const chatInput = () => {
			const sendMessageButton = async () => {
				const messageContainer = document.getElementById("message");
				const body = messageContainer.innerText.trim();
				const attachments = await getFileAttachments();
				const imageAttachments = await getImageAttachments();
				if (body.length > 0 || attachments.length > 0 || imageAttachments.length > 0) {
					messageContainer.innerText = "";
					socket.send(JSON.stringify({ dialog_id, body, attachments, images: imageAttachments, event: "send" }));
				}
			};

			const appendToInput = (value: string) => {
				const messageContainer = document.getElementById("message");
				messageContainer.innerText = messageContainer.innerText.concat(value);
			};

			const sendSticker = (url: string) => {
				socket.send(JSON.stringify({ dialog_id, images: [url], event: "send" }));
			};

			if (isMobile()) {
				return (
					<div className="flex flex-c no-gap" style="padding: 0 1rem;">
						<div className="flex no-gap items-center">
							<div id="message" className="grow bg-white break-word" style="max-height: 8rem;" contentEditable />
							<AttachmentComponent />
							<PickerComponent appendToInput={appendToInput} sendSticker={sendSticker} />
							<span onClick={sendMessageButton} className="pointer pd-4 bg-white border border-sm">
								📩
							</span>
						</div>
					</div>
				);
			}

			const sendMessage = async (event: EventWithTarget<HTMLInputElement, KeyboardEvent>) => {
				if (event.key === "Enter") {
					const body = event.target.innerText.trim();
					const attachments = await getFileAttachments();
					const imageAttachments = await getImageAttachments();
					if (body.length === 0) {
						event.preventDefault();
					} else if (!event.shiftKey) {
						event.preventDefault();
						event.target.innerText = "";
						socket.send(JSON.stringify({ dialog_id, body, attachments, images: imageAttachments, event: "send" }));
					}
				}
			};

			return (
				<div className="flex no-gap" style="padding: 0 1rem;">
					<div
						id="message"
						onKeyDown={sendMessage}
						className="grow bg-white break-word pd-4"
						style="max-height: 8rem;"
						contentEditable
					/>
					<AttachmentComponent />
					<PickerComponent appendToInput={appendToInput} sendSticker={sendSticker} />
					<span onClick={sendMessageButton} className="pointer pd-4 bg-white border border-sm">
						📩
					</span>
				</div>
			);
		};

		return (
			<div className="space-half flex flex-c overflow justify-between d-middle">
				<p className="d-middle bg-white pd-4 border-sm">{chatName()}</p>
				<div className="dialog flex flex-cr grow overflow">{messages.map(mapMessage)}</div>
				{chatInput()}
			</div>
		);
	}

	return <Spinner />;
};
