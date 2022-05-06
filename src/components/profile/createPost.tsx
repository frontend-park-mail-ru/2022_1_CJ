import { treact } from "@treact";
import { navigateTo } from "src/components/@helpers/router";
import { Component, ModalComponent } from "src/components/@types/component";
import { Routes } from "src/constants/routes";
import { EventWithTarget } from "src/core/@types/event";
import { postAPI } from "src/core/network/api/post";

const Modal: ModalComponent = ({ hide }) => {
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

	const post = () => {
		postAPI.createPost({ message }).then(() => navigateTo(Routes.Feed));
	};

	return (
		<div className="modal flex items-center">
			<div className="flex flex-c d-middle bg-white pd-8 border-sm">
				<span className="cross" onClick={hide} />
				<div onKeyUp={handleChange} contentEditable />
				<button onClick={post} className="btn btn-primary d-middle">
					Post
				</button>
			</div>
		</div>
	);
};

export const CreatePost: Component = () => {
	const [show, setShow] = treact.useState(false);
	const hide = () => setShow(false);
	return (
		<>
			<button onClick={() => setShow(true)} className="btn btn-white d-middle">
				Create post
			</button>
			{show && <Modal hide={hide} />}
		</>
	);
};
