import { Component, treact } from "@treact";

export const CrossComponent: Component = ({ hide }: { hide: () => void }) => {
	return <img src="/static/icons/cross.svg" className="cross" onClick={hide} />;
};
