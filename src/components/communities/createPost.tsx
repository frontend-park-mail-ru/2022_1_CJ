import { Component, ModalComponent, treact } from "@treact";
import { EventWithTarget } from "src/core/@types/event";
import { communitiesAPI } from "src/core/network/api/communities";

const Modal: ModalComponent = (props) => {
	const [message, setMessage] = treact.useState("");
	const update = treact.useUpdate();
	const hide = props.hide;
	const community_id = props.community_id as string;

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
		communitiesAPI.createCommunityPost({ community_id, message }).then(() => {
			update();
			hide();
		});
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

export const CreateCommunityPost: Component = ({ community_id }: { community_id: string }) => {
	const [show, setShow] = treact.useState(false);
	const hide = () => setShow(false);
	return (
		<>
			<button onClick={() => setShow(true)} className="btn btn-white d-middle">
				Create post
			</button>
			{show && <Modal hide={hide} community_id={community_id} />}
		</>
	);
};
