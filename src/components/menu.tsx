import { treact } from "@treact";
import { URL } from "src/constants/constants";
import { Component } from "./@types/component";
import { Link } from "./link";

export const Menu: Component = () => {
	return (
		<div className="flow" style="--flow-space: 0.5rem;">
			<Link to={URL.Profile}>My profile</Link>
			<Link to={URL.Feed}>Feed</Link>
			<Link to={URL.Messenger}>Messenger</Link>
			<Link to={URL.Friends}>Friends</Link>
		</div>
	);
};
