import { Component, Fiber, FiberAction, Node, State } from "src/core/treact/core/models";

const isEvent = (key: string) => key.startsWith("on");
const isProperty = (key: string) => !isEvent(key) && key !== "children";
const isNew = (prev: any, next: any) => (key: any) => prev[key] !== next[key];
const isGone = (next: any) => (key: any) => !(key in next);

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

const commitWork = (fiber?: Fiber) => {
	if (!fiber) {
		return;
	}

	commitWork(fiber.child);

	const parentFiber = hoist(fiber.parent);
	const parentNode = parentFiber?.node || null;

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

const reconcileChildren = (wipFiber: Fiber, elements: any) => {
	let index = 0;
	let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
	let prevSibling: Fiber | null;
	while (index < elements.length || oldFiber) {
		const element = elements[index];
		const sameType = oldFiber && element && element.type === oldFiber.type;
		const newFiber = ((): Fiber | null => {
			if (sameType) {
				return {
					type: oldFiber ? oldFiber.type : null,
					props: element.props,
					node: oldFiber ? oldFiber.node : null,
					parent: wipFiber,
					alternate: oldFiber,
					action: FiberAction.Update,
				};
			}

			if (element && !sameType) {
				return {
					type: element.type,
					props: element.props,
					node: null,
					parent: wipFiber,
					alternate: null,
					action: FiberAction.Create,
				};
			}

			return null;
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

const resetState = (fiber: Fiber) => {
	State.wipFiber = fiber;
	State.hookIndex = 0;
	State.wipFiber.hooks = [];
};

const updateFunctionComponent = (fiber: Fiber) => {
	resetState(fiber);
	const results = (fiber.type as Component)(fiber.props);
	const children = Array.isArray(results) ? results : [results];
	reconcileChildren(fiber, children);
};

const createNode = (fiber: Fiber) => {
	const type = fiber.type as string;
	const node = type === "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(type);
	updateNode(node, {}, fiber.props);
	return node;
};

const updateHostComponent = (fiber: Fiber) => {
	if (!fiber.node) {
		fiber.node = createNode(fiber);
	}
	reconcileChildren(fiber, fiber.props.children);
};

const updateComponent = (fiber: Fiber) => {
	if (fiber.type instanceof Function) {
		updateFunctionComponent(fiber);
	} else {
		updateHostComponent(fiber);
	}
};

const performCleanup = () => {
	State.pendingCleanups.forEach((cleanup) => cleanup());
	State.pendingCleanups = State.cleanups;
	State.cleanups = [];
};

const commitRoot = () => {
	performCleanup();
	State.deletions.forEach(commitWork);
	if (State.wipRoot?.child) {
		commitWork(State.wipRoot.child);
		State.currentRoot = State.wipRoot;
	}
	State.wipRoot = null;
};

export { updateComponent, commitRoot };
