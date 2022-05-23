import { Component, ModalComponent, treact } from "@treact";
import { EventWithTarget } from "src/core/@types/event";
import { Post } from "src/core/@types/post";
import { editComment } from "src/core/network/api/comments/edit";

const ModalEdit: ModalComponent = ({
	hide,
	post_id,
	comment,
}: {
	post_id: string;
	comment: Post;
	hide: () => void;
}) => {
	const [message, setMessage] = treact.useState("");

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

	// TODO: add update
	const edit = () => {
		editComment({ post_id, comment_id: comment.id, message: message });
	};

	return (
		<div className="modal flex items-center">
			<div className="flex flex-c d-middle bg-white pd-8 border-sm" style="width: clamp(15rem, 75%, 30rem);">
				<span className="cross" onClick={hide} />
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

export const EditCommentComponent: Component = ({ post_id, comment }: { post_id: string; comment: Post }) => {
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
