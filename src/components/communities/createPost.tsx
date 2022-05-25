import { Component, ModalComponent, treact } from "@treact";
import { MessageAttachmentComponent, MessageImageAttachmentComponent } from "src/components/messenger/attachment";
import { EventWithTarget } from "src/core/@types/event";
import { communitiesAPI } from "src/core/network/api/communities";
import { uploadFile } from "src/core/network/api/file/upload";
import { uploadImage } from "src/core/network/api/static/upload";

const Modal: ModalComponent = (props) => {
	const [message, setMessage] = treact.useState("");
	const update = treact.useUpdate();
	const hide = props.hide;
	const community_id = props.community_id as string;

	treact.useEffect(() => {
		const close = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				hide();
				window.removeEventListener("keydown", close);
			}
		};
		window.addEventListener("keydown", close);
	}, []);

	const handleChange = (event: EventWithTarget<HTMLSpanElement, KeyboardEvent>) => {
		setMessage(event.target.innerText);
	};

	const getAttachments = async () => {
		const attachments = document.getElementById("attachments") as HTMLInputElement;
		if (attachments.files.length > 0) {
			const formData = new FormData();
			formData.append("file", attachments.files[0]);
			return uploadFile(formData).then((response) => response.url);
		}
		return null;
	};

	const getImageAttachments = async () => {
		const attachments = document.getElementById("images") as HTMLInputElement;
		const images = [] as string[];
		for (const [, file] of Object.entries(attachments.files)) {
			const formData = new FormData();
			formData.append("image", file);
			const url = await uploadImage(formData).then((response) => response.url);
			images.push(url);
		}
		return images;
	};

	const post = async () => {
		const attachments = [await getAttachments()];
		const imageAttachments = await getImageAttachments();
		communitiesAPI.createCommunityPost({ community_id, message, attachments, images: imageAttachments }).then(() => {
			update();
			hide();
		});
	};

	return (
		<div className="modal flex items-center">
			<div className="flex flex-c d-middle bg-white pd-8 border-sm">
				<span className="cross" onClick={hide} />
				<div onKeyUp={handleChange} contentEditable />
				<div className="flex flex-r">
					<MessageImageAttachmentComponent />
					<MessageAttachmentComponent />
				</div>
				<button onClick={post} className="btn btn-primary d-middle">
					Post
				</button>
			</div>
		</div>
	);
};

export const CreateCommunityPost: Component = ({ community_id }: { community_id: string }) => {
	const [show, setShow] = treact.useState(false);
	const hide = () => setShow(false);
	return (
		<>
			<button onClick={() => setShow(true)} className="btn btn-white d-middle">
				Create post
			</button>
			{show && <Modal hide={hide} community_id={community_id} />}
		</>
	);
};
