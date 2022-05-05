import { treact } from "@treact";
import { navigateTo } from "src/components/@helpers/router";
import { Component } from "src/components/@types/component";
import { Routes } from "src/constants/routes";
import { EventWithTarget } from "src/core/@types/event";
import { postAPI } from "src/core/network/api/post";

const Modal: Component = ({ setShow }: { setShow: Function }) => {
	const [message, setMessage] = treact.useState("");

	treact.useEffect(() => {
		const close = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setShow(false);
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
				<span className="cross" onClick={() => setShow(false)} />
				<span onKeyUp={handleChange} contentEditable />
				<button onClick={post} className="btn btn-primary d-middle">
					Post
				</button>
			</div>
		</div>
	);
};

export const CreatePost: Component = () => {
	const [show, setShow] = treact.useState(false);

	return (
		<>
			<button onClick={() => setShow(true)} className="btn bg-white d-middle text-primary">
				Create post
			</button>
			{show && <Modal setShow={setShow} />}
		</>
	);
};
