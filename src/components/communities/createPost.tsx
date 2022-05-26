import { Component, ModalComponent, treact } from "@treact";
import { CrossComponent } from "src/components/@helpers/cross";
import { FileAttachmentsComponent, getFileAttachments } from "src/components/attachments/file";
import { getImageAttachments, ImageAttachmentsComponent } from "src/components/attachments/images";
import { EventWithTarget } from "src/core/@types/event";
import { communitiesAPI } from "src/core/network/api/communities";

const Modal: ModalComponent = (props) => {
	const [message, setMessage] = treact.useState("");
	const update = treact.useUpdate();
	const hide = props.hide;
	const community_id = props.community_id as string;
	treact.useClickOutside("modal", hide);

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
		communitiesAPI.createCommunityPost({ community_id, message, attachments, images: imageAttachments }).then(() => {
			update();
			hide();
		});
	};

	return (
		<div className="modal flex items-center">
			<div id="modal" className="flex flex-c d-middle bg-white pd-8 border-sm" style="width: clamp(15rem, 75%, 30rem);">
				<CrossComponent hide={hide} />
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

export const CreateCommunityPost: Component = ({ community_id }: { community_id: string }) => {
	const [show, setShow] = treact.useState(false);
	const hide = () => setShow(false);
	return (
		<>
			<div onClick={() => setShow(true)} className="btn btn-white d-middle">
				Create post
			</div>
			{show && <Modal hide={hide} community_id={community_id} />}
		</>
	);
};
