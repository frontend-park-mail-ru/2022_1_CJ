import { treact } from "@treact";
import { navigateTo } from "src/components/@helpers/router";
import { Component } from "src/components/@types/component";
import { Routes } from "src/constants/routes";
import { EventWithTarget } from "src/core/@types/event";
import { communitiesAPI } from "src/core/network/api/communities";

export const CreateCommunityPost: Component = ({ community_id }: { community_id: string }) => {
	const [message, setMessage] = treact.useState("");
	const [show, setShow] = treact.useState(false);

	const handleChange = (event: EventWithTarget<HTMLSpanElement>) => {
		setMessage(event.target.innerText);
	};

	const createPost = () => {
		if (show && message.length > 0) {
			communitiesAPI.createCommunityPost({ community_id, message }).then(() => navigateTo(Routes.Feed));
		} else {
			setShow(true);
		}
	};

	return (
		<div className="post flex flex-c bg-white pd-8 border-sm">
			{show && <span className="textarea" onKeyUp={handleChange} contentEditable />}
			<button onClick={createPost} className="btn btn-transparent d-middle">
				Create post
			</button>
		</div>
	);
};
