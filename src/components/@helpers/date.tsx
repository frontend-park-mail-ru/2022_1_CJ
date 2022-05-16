import { treact } from "@treact";
import { fromTimestamp } from "src/components/@helpers/time";
import { Component } from "src/core/treact/models";

export const DateFromTimestamp: Component = ({ timestamp }: { timestamp: number }) => {
	return <p className="text-light fs-sm">{fromTimestamp(timestamp)}</p>;
};
