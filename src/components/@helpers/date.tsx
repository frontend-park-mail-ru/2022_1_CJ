import { Component, treact } from "@treact";

const fromTimestamp = (timestamp: number) => new Date(timestamp * 1000).toLocaleString();

export const DateFromTimestamp: Component<{ timestamp: number }> = ({ timestamp }) => {
	return <p className="text-light fs-sm">{fromTimestamp(timestamp)}</p>;
};
