type ComponentProperties = {
	[key: string]: object | string | number;
};

export type Component = (props?: ComponentProperties) => JSX.Element;

export type ModalComponent = (props?: ComponentProperties & { hide: () => void }) => JSX.Element;

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
	type?: string | Component;
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
	cleanups?: (() => void)[];
	pendingCleanups?: (() => void)[];
};

export const State = {} as State;
