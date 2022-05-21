import { Component, treact } from "@treact";
import { ModalEdit } from "src/components/posts/modal";
import { Post } from "src/core/@types/post";

export const EditPost: Component = ({ post }: { post: Post }) => {
	const [show, setShow] = treact.useState(false);
	const hide = () => setShow(false);
	return (
		<>
			<button onClick={() => setShow(true)} className="btn btn-white d-middle">
				Edit post
			</button>
			{show && <ModalEdit post={post} hide={hide} />}
		</>
	);
};
