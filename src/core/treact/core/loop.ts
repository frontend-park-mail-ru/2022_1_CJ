import { commitRoot, updateComponent } from "src/core/treact/core/reconciliation";
import { Fiber, State } from "src/core/treact/core/models";

const nextUnitOfWork = (fiber: Fiber) => {
	while (fiber) {
		if (fiber.sibling) {
			return fiber.sibling;
		}
		fiber = fiber.parent;
	}
	return null;
};

const performUnitOfWork = (fiber: Fiber) => {
	updateComponent(fiber);

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

export { workLoop };
