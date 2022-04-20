import { treact } from "@treact";
import { Component } from "./@types/component";

export const HelperError: Component = (props) => {
	const { message } = props;
	return <div className="helper helper-error">{message || "error"}</div>;
};
