import { treact } from "@treact";
import { Header } from "./header";

export function Layout(context: object) {
	const children = (context as any).children || [];
	return (
		<div className="wrapper">
			<Header />
			<div className="content flex flex-r">{children}</div>
		</div>
	);
}
