import { treact } from "../treact/treact.js";

export function Layout(context: object) {
	const children = (context as any).children || [];
	return (
		<div id="layout" style="background-color: grey;">
			{children}
		</div>
	);
}
