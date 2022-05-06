type ComponentProperties = {
	[key: string]: object | string | number;
};

export type Component = (props?: ComponentProperties) => JSX.Element;

export type ModalComponent = (props?: ComponentProperties & { hide: () => void }) => JSX.Element;
