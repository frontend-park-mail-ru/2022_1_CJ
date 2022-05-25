import { ModalComponent, treact } from "@treact";
import { MessageAttachmentComponent, MessageImageAttachmentComponent } from "src/components/messenger/attachment";
import { EventWithTarget } from "src/core/@types/event";
import { Post } from "src/core/@types/post";
import { uploadFile } from "src/core/network/api/file/upload";
import { postAPI } from "src/core/network/api/post";
import { uploadImage } from "src/core/network/api/static/upload";

export const ModalCreate: ModalComponent = ({ hide }) => {
	const [message, setMessage] = treact.useState("");
	const update = treact.useUpdate();

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
		postAPI.createPost({ message, images: imageAttachments, attachments }).then(() => {
			update();
			hide();
		});
	};

	return (
		<div className="modal flex items-center">
			<div className="flex flex-c d-middle bg-white pd-8 border-sm" style="width: clamp(15rem, 75%, 30rem);">
				<span className="cross" onClick={hide} />
				<div onKeyUp={handleChange} contentEditable style="max-height: 33vh;" />
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

export const ModalEdit: ModalComponent = ({ hide, post }: { post: Post; hide: () => void }) => {
	const [message, setMessage] = treact.useState("");
	const update = treact.useUpdate();

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

	const edit = () => {
		postAPI.editPost({ post_id: post.id, message }).then(() => {
			update();
			hide();
		});
	};

	return (
		<div className="modal flex items-center">
			<div className="flex flex-c d-middle bg-white pd-8 border-sm" style="width: clamp(15rem, 75%, 30rem);">
				<span className="cross" onClick={hide} />
				<div onKeyUp={handleChange} contentEditable style="max-height: 33vh;">
					{post.message}
				</div>
				<button onClick={edit} className="btn btn-primary d-middle">
					Edit
				</button>
			</div>
		</div>
	);
};
