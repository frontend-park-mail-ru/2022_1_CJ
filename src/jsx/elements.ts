/// <reference path="./element-types.d.ts" />
/// <reference path="./events.d.ts" />
/// <reference path="./intrinsic-elements.d.ts" />

import { Children, Attributes, CustomElement } from "./models.js";

const voidElements = [
	"area",
	"base",
	"br",
	"col",
	"command",
	"embed",
	"hr",
	"img",
	"input",
	"keygen",
	"link",
	"meta",
	"param",
	"source",
	"track",
	"wbr",
];

const isVoidElement = (tagName: string) => {
	return voidElements.indexOf(tagName) > -1;
};

const escapeAttrNodeValue = (value: string) => {
	return value.replace(/(&)|(")|(\u00A0)/g, (_, amp, quote) => {
		if (amp) return "&amp;";
		if (quote) return "&quot;";
		return "&nbsp;";
	});
};

const makeAttribute = (value: string) => `${name}="${value}"`;

const attributeToString =
	(attributes: Attributes) =>
	(name: string): string => {
		const value = attributes[name];
		if (value instanceof Date) {
			return makeAttribute(value.toISOString());
		} else if (value instanceof Boolean) {
			return value ? name : "";
		}
		return makeAttribute(escapeAttrNodeValue(value.toString()));
	};

const attributesToString = (attributes: Attributes | undefined): string => {
	if (attributes) {
		return Object.keys(attributes)
			.filter((attribute) => attribute !== "children") // filter out children attributes
			.map(attributeToString(attributes))
			.filter((attribute) => attribute.length) // filter out negative boolean attributes
			.join(" ");
	}
	return "";
};

const contentsToString = (contents: any[] | undefined) => {
	if (contents) {
		return contents.map((elements) => (Array.isArray(elements) ? elements.join("\n") : elements)).join("\n");
	}
	return "";
};

export function createElement(
	element: string | CustomElement,
	attributes: (Attributes & Children) | undefined = {},
	...contents: string[]
) {
	const children = (attributes && attributes.children) || contents;
	if (element instanceof Function) {
		return element(children ? { children, ...attributes } : attributes, contents);
	} else if (isVoidElement(element) && !contents.length) {
		return `<${element} ${attributesToString(attributes)}>`;
	}
	return `<${element} ${attributesToString(attributes)}>${contentsToString(contents)}</${element}>`;
}
