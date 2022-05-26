import { modAlertStore } from "src/stores/alert";

export class CodedError extends Error {
	code: number;
	constructor(message: string, code: number) {
		super(message);
		this.code = code;
	}
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const handleError = (err: Error) => {
	modAlertStore.set({ message: capitalize(err.message), level: "error" });
};
