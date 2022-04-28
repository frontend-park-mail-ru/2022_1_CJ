const triggerRoute = () => {
	const event = new Event("popstate");
	window.dispatchEvent(event);
};

export const navigateTo = (to: string) => {
	console.log("NAVIGATE TO", to);
	window.history.pushState({}, "", to);
	triggerRoute();
};
