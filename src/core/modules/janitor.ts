export interface Janitor {
	add(callback: Function): void;
	cleanup(): void;
}

const createJanitor = (): Janitor => {
	const callbacks = [] as Function[];

	const janitor: Janitor = {
		add: (callback: Function) => {
			callbacks.push(callback);
		},
		cleanup: () => {
			callbacks.forEach((callback) => callback());
			callbacks.splice(0);
		},
	};

	return janitor;
};

export default createJanitor();
