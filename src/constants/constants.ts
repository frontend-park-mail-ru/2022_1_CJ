export const URL = {
	Base: "/",
	Signup: "/signup",
	Login: "/login",
	Feed: "/feed",
	Logout: "/logout",
	Profile: "/u/:user_id",
	ProfileSettings: "/settings",
	Messenger: "/messenger",
	Friends: "/friends",
	Search: "/search",
};

export const urlWithParameters = (url: string, parameters: object) =>
	url
		.split("/")
		.reduce((result, part) =>
			result.concat(part.startsWith(":") ? `/${(parameters as any)[part.slice(1)]}` : `/${part}`)
		);
