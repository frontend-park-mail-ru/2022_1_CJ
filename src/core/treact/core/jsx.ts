import { workLoop } from "src/core/treact/core/loop";
import { Component, Fiber, Node, State } from "src/core/treact/core/models";

const unwind = <T>(children: T | T[], out: T[]) => {
	if (children === null || typeof children === "boolean") {
		return out;
	}

	if (children instanceof Array) {
		children.forEach((child) => unwind(child, out));
	} else {
		out.push(children);
	}

	return out;
};

const createTextElement = (text: string): Fiber => {
	return {
		type: "TEXT_ELEMENT",
		props: {
			nodeValue: text,
			children: [] as object[],
		},
	};
};

const createFragmentElement = (props: any): Fiber => {
	return props.children;
};

const createElement = (type: string | Component, props: object, ...children: object[]) => {
	children = unwind(children, []);
	return {
		type,
		props: {
			...props,
			children: children.map((child) => (child instanceof Object ? child : createTextElement(child))),
		},
	};
};

const render = (element: JSX.Element, container: Node) => {
	State.wipRoot = {
		node: container,
		props: {
			children: [element],
		},
		hooks: [],
		alternate: State.currentRoot,
	};

	State.deletions = [];
	State.cleanups = [];
	State.pendingCleanups = [];

	State.nextUnitOfWork = State.wipRoot;
	window.requestIdleCallback(workLoop);
};

export { createFragmentElement, createElement, render };
