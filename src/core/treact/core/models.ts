type ComponentProperties = {
	[key: string]: object | string | number | boolean;
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
	type?: Component | keyof JSX.IntrinsicElements | "TEXT_ELEMENT";
	props?: any;
	node?: Node;
	hooks?: any[];
	action?: FiberAction;

	parent?: Fiber;
	child?: Fiber;
	sibling?: Fiber;
	ancestor?: Fiber;
};

type State = {
	root: Fiber;
	wipRoot: Fiber;
	wipFiber: Fiber;
	hookIndex: number;

	deletions: Fiber[];
	cleanups?: (() => void)[];
	pendingCleanups?: (() => void)[];
	pendingUpdate: boolean;

	nextUnitOfWork?: Fiber;
};

export const State = {} as State;
