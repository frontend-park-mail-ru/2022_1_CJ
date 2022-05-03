import { treact } from "@treact";
import { Component } from "src/components/@types/component";
import { EventWithTarget } from "src/core/@types/event";
import { postAPI } from "src/core/network/api/post";

export const CreatePost: Component = () => {
	const [message, setMessage] = treact.useState("");
	const [show, setShow] = treact.useState(false);

	const handleChange = (event: EventWithTarget<HTMLSpanElement>) => {
		setMessage(event.target.innerText);
	};

	const createPost = () => {
		if (show) {
			postAPI.createPost({ message });
		} else {
			setShow(true);
		}
	};

	return (
		<div className="post flex flex-c bg-white pd-8">
			{show && <span onKeyUp={handleChange} contentEditable />}
			<button onClick={createPost} className="btn btn-transparent d-middle">
				Create post
			</button>
		</div>
	);
};
