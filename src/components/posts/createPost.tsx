import { Component, treact } from "@treact";
import { ModalCreate } from "src/components/posts/modal";

export const CreatePost: Component = () => {
	const [show, setShow] = treact.useState(false);
	const hide = () => setShow(false);
	return (
		<>
			<button onClick={() => setShow(true)} className="btn btn-secondary d-middle">
				Create post
			</button>
			{show && <ModalCreate hide={hide} />}
		</>
	);
};
