import { treact } from "../treact/treact";
import { Header } from "./header";

export function Layout(context: object) {
	const children = (context as any).children || [];
	return (
		<div>
			<Header />
			{children}
		</div>
	);
}
