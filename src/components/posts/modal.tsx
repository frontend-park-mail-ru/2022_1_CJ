import { ModalComponent, treact } from "@treact";
import { FileAttachmentsComponent, getFileAttachments } from "src/components/attachments/file";
import { getImageAttachments, ImageAttachmentsComponent } from "src/components/attachments/images";
import { EventWithTarget } from "src/core/@types/event";
import { Post } from "src/core/@types/post";
import { postAPI } from "src/core/network/api/post";

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

	const post = async () => {
		const attachments = await getFileAttachments();
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
				<div className="flex flex-r no-gap">
					<div onKeyUp={handleChange} className="grow" contentEditable style="max-height: 33vh;" />
					<ImageAttachmentsComponent />
					<FileAttachmentsComponent />
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
