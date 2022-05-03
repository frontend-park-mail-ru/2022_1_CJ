export const decodeEntity = (str: string) => {
	var doc = new DOMParser().parseFromString(str, "text/html");
	return doc.documentElement.textContent;
};
