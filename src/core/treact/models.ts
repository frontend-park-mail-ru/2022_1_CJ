// TODO: add a way to pass cleanup callbacks on unmount

export type Node = HTMLElement | Text;

export type Action = {
	type: string;
	payload?: object;
};

export enum FiberAction {
	Create,
	Update,
	Delete,
}

export type Fiber = {
	props: any;
	alternate?: Fiber;
	node?: Node;
	type?: string | Function;
	action?: FiberAction;
	parent?: Fiber;
	child?: Fiber;
	sibling?: Fiber;
	hooks?: any[];
};

type State = {
	wipRoot?: Fiber;
	wipFiber: Fiber;
	currentRoot: Fiber;
	nextUnitOfWork?: Fiber;
	hookIndex: number;
	deletions: Fiber[];
};

export const State = {} as State;
