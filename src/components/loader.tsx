import { treact } from "@treact";
import { Component } from "./@types/component";
import "/src/assets/styles/loader.scss";

export const Loader: Component = () => {
	return (
		<div className="full flex items-center">
			<div className="loader"></div>
		</div>
	);
};
