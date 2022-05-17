import { treact } from "@treact";
import { Component } from "src/core/treact/models";
import { ModalCreate, ModalEdit } from "src/components/posts/modal";
import { Post } from "src/core/@types/post";

// TODO: rename file
export const CreatePost: Component = () => {
	const [show, setShow] = treact.useState(false);
	const hide = () => setShow(false);
	return (
		<>
			<button onClick={() => setShow(true)} className="btn btn-white d-middle">
				Create post
			</button>
			{show && <ModalCreate hide={hide} />}
		</>
	);
};

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
