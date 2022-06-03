import { Component, ModalComponent, treact } from "@treact";
import { CrossComponent } from "src/components/@helpers/cross";
import { EventWithTarget } from "src/core/@types/event";
import { Post } from "src/core/@types/post";
import { apiCommunitiesEditPost } from "src/core/network/api/communities/editPost";

const Modal: ModalComponent<{ post: Post }> = ({ hide, post }) => {
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

	const save = async () => {
		apiCommunitiesEditPost({ community_id: post.author.id, post_id: post.id, message }).then(() => {
			update();
			hide();
		});
	};

	return (
		<div className="modal flex items-center">
			<div id="modal" className="flex flex-c d-middle bg-white pd-8 border-sm">
				<CrossComponent hide={hide} />
				<div className="flex flex-r no-gap">
					<div onKeyUp={handleChange} className="grow" contentEditable style="max-height: 33vh;">
						{post.message}
					</div>
				</div>
				<button onClick={save} className="btn btn-primary d-middle">
					Save
				</button>
			</div>
		</div>
	);
};

export const EditCommunityPost: Component<{ post: Post }> = ({ post }) => {
	const [show, setShow] = treact.useState(false);
	const hide = () => setShow(false);
	return (
		<>
			<button onClick={() => setShow(true)} className="btn btn-white d-middle">
				Edit
			</button>
			{show && <Modal hide={hide} post={post} />}
		</>
	);
};
