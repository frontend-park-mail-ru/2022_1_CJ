import { Component, treact } from "@treact";

export const HelperError: Component<{ message?: string }> = ({ message }) => {
	return <p className="helper helper-error">{message || "error"}</p>;
};
