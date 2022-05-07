import { treact } from "@treact";
import { Component } from "src/core/treact/models";

export const HelperError: Component = (props) => {
	const { message } = props;
	return <p className="helper helper-error">{message || "error"}</p>;
};
