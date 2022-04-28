import { FiberAction, Node, Fiber, State } from "./models";

const TEXT_ELEMENT = "TEXT_ELEMENT";

export const isEvent = (key: string) => key.startsWith("on");
export const isProperty = (key: string) => !isEvent(key) && key !== "children";
export const isNew = (prev: any, next: any) => (key: any) => prev[key] !== next[key];
export const isGone = (next: any) => (key: any) => !(key in next);

const toChildArray = <T>(children: T | T[], out: T[]) => {
	if (children === null || typeof children === "boolean") {
		return out;
	}

	if (children instanceof Array) {
		children.forEach((child) => toChildArray(child, out));
	} else {
		out.push(children);
	}

	return out;
};

const updateNode = (node: Node, prevProps: any, nextProps: any) => {
	// Update changed properties.
	Object.keys(prevProps)
		.filter(isProperty)
		.filter(isGone(nextProps))
		.forEach((property) => {
			(node as any)[property] = "";
		});

	Object.keys(nextProps)
		.filter(isProperty)
		.filter(isNew(prevProps, nextProps))
		.forEach((property) => {
			(node as any)[property] = nextProps[property];
		});

	// Update event listeners.
	Object.keys(prevProps)
		.filter(isEvent)
		.filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
		.forEach((event) => {
			const eventType = event.toLowerCase().substring(2);
			node.removeEventListener(eventType, prevProps[event]);
		});

	Object.keys(nextProps)
		.filter(isEvent)
		.filter(isNew(prevProps, nextProps))
		.forEach((name) => {
			const eventType = name.toLowerCase().substring(2);
			node.addEventListener(eventType, nextProps[name]);
		});
};

const createNode = (fiber: Fiber): Node => {
	const node = fiber.type === TEXT_ELEMENT ? document.createTextNode("") : document.createElement(fiber.type as string);
	updateNode(node, {}, fiber.props);
	return node;
};

const commitDelete = (fiber?: Fiber) => {
	if (!fiber) {
		return;
	}

	if (fiber.node) {
		fiber.node.remove();
	} else if (fiber.child) {
		commitDelete(fiber.child);
	}
};

const hoist = (fiber?: Fiber) => {
	while (fiber && !fiber.node) {
		fiber = fiber.parent;
	}
	return fiber;
};

// TODO: get rid of recursion
const commitWork = (fiber?: Fiber) => {
	if (!fiber) {
		return;
	}

	commitWork(fiber.child);

	const parentFiber = hoist(fiber.parent);
	const parentNode = parentFiber?.node || undefined;

	const { action } = fiber;
	if (action === FiberAction.Create && fiber.node && parentNode) {
		parentNode.appendChild(fiber.node);
	} else if (action === FiberAction.Update && fiber.node && fiber.alternate) {
		updateNode(fiber.node, fiber.alternate.props, fiber.props);
	} else if (action === FiberAction.Delete && parentNode) {
		commitDelete(fiber);
	}

	commitWork(fiber.sibling);
};

const commitRoot = () => {
	State.deletions.forEach(commitWork);
	if (State.wipRoot?.child) {
		commitWork(State.wipRoot.child);
		State.currentRoot = State.wipRoot;
	}
	State.wipRoot = undefined;
};

const resetState = (fiber: Fiber) => {
	State.wipFiber = fiber;
	State.hookIndex = 0;
	State.wipFiber.hooks = [];
};

const updateFunctionComponent = (fiber: Fiber) => {
	resetState(fiber);
	const results = (fiber.type as Function)(fiber.props);
	const children = Array.isArray(results) ? results : [results];
	reconcileChildren(fiber, children);
};

const updateHostComponent = (fiber: Fiber) => {
	if (!fiber.node) {
		fiber.node = createNode(fiber);
	}
	reconcileChildren(fiber, fiber.props.children);
};

const reconcileChildren = (wipFiber: Fiber, elements: any) => {
	let index = 0;
	let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
	let prevSibling: Fiber | undefined = undefined;
	while (index < elements.length || oldFiber) {
		const element = elements[index];
		const sameType = oldFiber && element && element.type === oldFiber.type;
		const newFiber = ((): Fiber | undefined => {
			if (sameType) {
				return {
					type: oldFiber ? oldFiber.type : undefined,
					props: element.props,
					node: oldFiber ? oldFiber.node : undefined,
					parent: wipFiber,
					alternate: oldFiber,
					action: FiberAction.Update,
				};
			}

			if (element && !sameType) {
				return {
					type: element.type,
					props: element.props,
					node: undefined,
					parent: wipFiber,
					alternate: undefined,
					action: FiberAction.Create,
				};
			}

			return undefined;
		})();

		if (oldFiber && !sameType) {
			oldFiber.action = FiberAction.Delete;
			State.deletions.push(oldFiber);
		}

		if (oldFiber) {
			oldFiber = oldFiber.sibling;
		}

		if (index === 0) {
			wipFiber.child = newFiber;
		} else if (element && prevSibling) {
			prevSibling.sibling = newFiber;
		}

		prevSibling = newFiber;
		++index;
	}
};

const createTextElement = (text: string) => {
	return {
		type: TEXT_ELEMENT,
		props: {
			nodeValue: text,
			children: [] as any[],
		},
	};
};

const createFragmentElement = (props: any) => {
	return props.children;
};

const createElement = (type: string | Function, props: any, ...children: any[]) => {
	children = toChildArray(children, []);
	return {
		type,
		props: {
			...props,
			children: children.map((child) => (child instanceof Object ? child : createTextElement(child))),
		},
	};
};

const render = (element: any, container: Node) => {
	State.wipRoot = {
		node: container,
		props: {
			children: [element],
		},
		alternate: State.currentRoot,
		hooks: [],
	};
	State.deletions = [];
	State.nextUnitOfWork = State.wipRoot;
};

export { createElement, render, createFragmentElement };

const nextUnitOfWork = (fiber: Fiber | undefined) => {
	while (fiber) {
		if (fiber.sibling) {
			return fiber.sibling;
		}
		fiber = fiber.parent;
	}
	return undefined;
};

const performUnitOfWork = (fiber: Fiber) => {
	if (fiber.type instanceof Function) {
		updateFunctionComponent(fiber);
	} else {
		updateHostComponent(fiber);
	}

	if (fiber.child) {
		return fiber.child;
	}

	return nextUnitOfWork(fiber);
};

const workLoop = (deadline: IdleDeadline) => {
	let shouldYield = false;
	while (State.nextUnitOfWork && !shouldYield) {
		State.nextUnitOfWork = performUnitOfWork(State.nextUnitOfWork);
		shouldYield = deadline.timeRemaining() < 1;
	}

	if (!State.nextUnitOfWork && State.wipRoot) {
		commitRoot();
	}

	window.requestIdleCallback(workLoop);
};

window.requestIdleCallback(workLoop);
