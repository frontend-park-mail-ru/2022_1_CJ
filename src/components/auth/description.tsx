import { Component, treact } from "@treact";

export const Description: Component = () => {
	return (
		<span>
			<p className="fs-xlg text-primary bold text-center">Social Network CJ</p>
			<p className="text-light text-center">Chat, share, and keep in touch with the world</p>
			<div className="flex flex-r justify-center">
				<img src="/static/icons/messages.svg" className="icon" alt="" />
				<img src="/static/icons/search.svg" className="icon" alt="" />
				<img src="/static/icons/communities.svg" className="icon" alt="" />
			</div>
		</span>
	);
};
