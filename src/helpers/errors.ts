import { CodedError } from "../core/models/error";

export const handleError = (err: Error | CodedError) => {
	if (err instanceof CodedError) {
		console.log(err.message, err.code);
	} else {
		console.log(err.message);
	}
};
