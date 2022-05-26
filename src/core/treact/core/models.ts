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
	props: any;
	alternate?: Fiber;
	node?: Node;
	type?: keyof JSX.IntrinsicElements | "TEXT_ELEMENT" | Component;
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
	hookIndex: number;

	deletions: Fiber[];
	cleanups?: (() => void)[];
	pendingCleanups?: (() => void)[];
	pendingUpdate: boolean;

	nextUnitOfWork?: Fiber;
};

export const State = {} as State;
