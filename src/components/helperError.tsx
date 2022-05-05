import { treact } from "@treact";
import { Component } from "./@types/component";

export const HelperError: Component = (props) => {
	const { message } = props;
	return <p className="helper helper-error">{message || "error"}</p>;
};
