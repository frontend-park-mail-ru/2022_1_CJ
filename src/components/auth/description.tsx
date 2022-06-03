import { Component, treact } from "@treact";

const span = (str: string) => <span style="color: #fb0e55;">{str}</span>;

export const Description: Component = () => {
	return (
		<span className="flex flex-c no-gap">
			<p className="fs-xlg text-primary bold text-center">Social Network CJ</p>
			<p className="text-light text-center" style="max-width: min(500px, 85vw);">
				Is a place where you can {span("chat")} and {span("share")} with your friends
				<p>
					Create {span("communities")}, make {span("your own history")}, and {span("keep in touch")} with the whole
					world!
				</p>
			</p>
		</span>
	);
};
