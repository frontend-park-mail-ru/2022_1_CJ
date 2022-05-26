import { Validator } from "src/core/treact/@hooks/useForm";

// TODO: add options (e.g. maxLength, minLength, ...)

const regexps = {
	email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
	// password: 8 to 15 characters, mixed cases, at least one digit and special character
	password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
};

export const ValidatorRequired: Validator = {
	isValid: (value) => value.length > 0,
	message: "Cannot be empty",
};

export const ValidatorEmail: Validator = {
	isValid: (value) => regexps.email.test(value),
	message: "Invalid email",
};

export const ValidatorPassword: Validator = {
	isValid: (value) => regexps.password.test(value),
	message: "Invalid password",
};
