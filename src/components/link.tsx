import { treact, Component, ModalComponent } from "@treact";
import { navigateTo } from "src/components/@helpers/router";

export const Link: Component = ({ to, children }: { to: string; children: object }) => {
	const handleClick = (event: MouseEvent) => {
		event.preventDefault();
		if (window.location.pathname !== to) {
			navigateTo(to);
		}
	};

	return (
		<a className="link d-block pointer" href={to} onClick={handleClick}>
			{children}
		</a>
	);
};
