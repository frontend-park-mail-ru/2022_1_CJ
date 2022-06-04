type ComponentProperties = {
	children?: any;
};

export type Component<T = {}> = (props: ComponentProperties & T) => JSX.Element | null;

export type ModalComponent<T = {}> = (props: ComponentProperties & { hide: () => void } & T) => JSX.Element | null;

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
	type?: Component<any> | keyof JSX.IntrinsicElements | "TEXT_ELEMENT";
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
	wipRoot?: Fiber;
	wipFiber: Fiber;
	hookIndex: number;

	deletions: Fiber[];
	cleanups: (() => void)[];
	pendingCleanups: (() => void)[];
	pendingUpdate: boolean;

	nextUnitOfWork?: Fiber;
};

export const State = {} as State;
