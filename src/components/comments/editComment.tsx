import { Component, ModalComponent, treact } from "@treact";
import { CrossComponent } from "src/components/@helpers/cross";
import { EventWithTarget } from "src/core/@types/event";
import { Post } from "src/core/@types/post";
import { editComment } from "src/core/network/api/comments/edit";

const ModalEdit: ModalComponent<{ post_id: string; comment: Post }> = ({ post_id, comment, hide }) => {
	const [message, setMessage] = treact.useState("");
	const update = treact.useUpdate();
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

	const edit = () => {
		editComment({ post_id, comment_id: comment.id, message }).then(() => {
			update();
			hide();
		});
	};

	return (
		<div className="modal flex items-center">
			<div id="modal" className="flex flex-c d-middle bg-white pd-8 border-sm" style="width: clamp(15rem, 75%, 30rem);">
				<CrossComponent hide={hide} />
				<div onKeyUp={handleChange} contentEditable style="max-height: 33vh;">
					{comment.message}
				</div>
				<button onClick={edit} className="btn btn-primary d-middle">
					Edit
				</button>
			</div>
		</div>
	);
};

export const EditCommentComponent: Component<{ post_id: string; comment: Post }> = ({ post_id, comment }) => {
	const [show, setShow] = treact.useState(false);
	const hide = () => setShow(false);
	return (
		<>
			<button onClick={() => setShow(true)} className="btn btn-white d-middle">
				Edit
			</button>
			{show && <ModalEdit post_id={post_id} comment={comment} hide={hide} />}
		</>
	);
};
