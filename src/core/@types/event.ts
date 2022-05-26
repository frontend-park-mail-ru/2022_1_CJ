export type EventWithTarget<T extends HTMLElement, U = Event> = U & {
	target: T;
};
