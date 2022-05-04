export const URL = {
	Base: "/",

	Signup: "/signup",
	Login: "/login",
	Logout: "/logout",

	Feed: "/feed",

	Profile: "/u/:user_id",
	ProfileSettings: "/settings",

	Messenger: "/messenger",
	Dialog: "/messenger/:dialog_id",
	Friends: "/friends",

	Communities: "/communities",
	CommunityCreate: "/community_create",
	Community: "/community/:community_id",
	CommunitySettings: "/community/:community_id/settings",
};

export const urlWithParameters = (url: string, parameters: object) =>
	url
		.split("/")
		.reduce((result, part) =>
			result.concat(part.startsWith(":") ? `/${(parameters as any)[part.slice(1)]}` : `/${part}`)
		);
