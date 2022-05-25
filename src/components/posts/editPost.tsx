import { Component, treact } from "@treact";
import { ModalEdit } from "src/components/posts/modal";
import { Post } from "src/core/@types/post";

export const EditPost: Component = ({ post }: { post: Post }) => {
	const [show, setShow] = treact.useState(false);
	const hide = () => setShow(false);
	return (
		<>
			<span onClick={() => setShow(true)} className="btn btn-white d-middle text-center">
				Edit
			</span>
			{show && <ModalEdit post={post} hide={hide} />}
		</>
	);
};
