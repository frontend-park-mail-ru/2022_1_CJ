declare type AttributeValue = number | string | Date | boolean | string[];
export interface Children {
    children?: AttributeValue;
}
export interface Attributes {
    [key: string]: AttributeValue;
}
export declare type CustomElement = (attributes: Attributes & Children, contents: string[]) => string;
export {};
//# sourceMappingURL=models.d.ts.map