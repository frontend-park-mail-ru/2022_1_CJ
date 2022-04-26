const triggerRoute = () => {
	const event = new Event("popstate");
	window.dispatchEvent(event);
};

export const navigateTo = (to: string) => {
	window.history.pushState({}, "", to);
	triggerRoute();
};
