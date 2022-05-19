import { treact, Component, ModalComponent } from "@treact";

export const HelperError: Component = (props) => {
	const { message } = props;
	return <p className="helper helper-error">{message || "error"}</p>;
};
