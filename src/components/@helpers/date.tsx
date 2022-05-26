import { Component, treact } from "@treact";
import { fromTimestamp } from "src/components/@helpers/time";

export const DateFromTimestamp: Component = ({ timestamp }: { timestamp: number }) => {
	return <p className="text-light fs-sm">{fromTimestamp(timestamp)}</p>;
};
