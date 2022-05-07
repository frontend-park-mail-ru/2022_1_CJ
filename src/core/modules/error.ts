import { modAlertStore } from "src/stores/alert";

export class CodedError extends Error {
	code: number;
	constructor(message: string, code: number) {
		super(message);
		this.code = code;
	}
}

export const handleError = (err: Error) => {
	modAlertStore.set({ message: err.message, level: "error" });
};
