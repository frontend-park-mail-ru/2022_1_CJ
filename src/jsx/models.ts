type AttributeValue = number | string | Date | boolean | string[];

export interface Children {
	children?: AttributeValue;
}

export interface Attributes {
	[key: string]: AttributeValue;
}

export type CustomElement = (attributes: Attributes & Children, contents: string[]) => string;
