type ComponentProperties = {
	[key: string]: object | string | number;
};

export type Component = (props: ComponentProperties) => JSX.Element;
