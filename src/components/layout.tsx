import { treact } from "@treact";
import { Component } from "./@types/component";
import { Header } from "./header";

export const Layout: Component = (props) => {
	const children = props.children || [];
	return (
		<div className="wrapper">
			<Header />
			<div className="content flex flex-r mt-8">{children}</div>
		</div>
	);
};
