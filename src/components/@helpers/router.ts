export const navigateTo = (to: string) => {
	window.history.pushState({}, "", to);
};
