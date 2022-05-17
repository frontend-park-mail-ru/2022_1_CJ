import { treact } from "@treact";
import { navigateTo } from "src/components/@helpers/router";
import { ModalComponent } from "src/core/treact/models";
import { Routes } from "src/constants/routes";
import { EventWithTarget } from "src/core/@types/event";
import { postAPI } from "src/core/network/api/post";
import { Post } from "src/core/@types/post";

export const ModalCreate: ModalComponent = ({ hide }) => {
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
	const post = () => {
		postAPI.createPost({ message }).then(() => navigateTo(Routes.Feed));
	};

	return (
		<div className="modal flex items-center">
			<div className="flex flex-c d-middle bg-white pd-8 border-sm">
				<span className="cross" onClick={hide} />
				<div onKeyUp={handleChange} contentEditable style="max-height: 33vh;" />
				<button onClick={post} className="btn btn-primary d-middle">
					Post
				</button>
			</div>
		</div>
	);
};

export const ModalEdit: ModalComponent = ({ hide, post }: { post: Post; hide: () => void }) => {
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
		postAPI.editPost({ post_id: post.id, message }).then(() => navigateTo(Routes.Feed));
	};

	return (
		<div className="modal flex items-center">
			<div className="flex flex-c d-middle bg-white pd-8 border-sm">
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
