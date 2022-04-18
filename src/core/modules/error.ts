export class CodedError extends Error {
	code: number;
	constructor(message: string, code: number) {
		super(message);
		this.code = code;
	}
}

export const handleError = (err: Error | CodedError) => {
	if (err instanceof CodedError) {
		console.log(err.message, err.code);
	} else {
		console.log(err.message);
	}
};
