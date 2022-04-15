import * as elements from "../jsx/elements.js";
import { Attributes } from "../jsx/models.js";

export const Layout = ({ children, ...attributes }: Attributes) => {
	return <div {...attributes}>{children}</div>;
};
