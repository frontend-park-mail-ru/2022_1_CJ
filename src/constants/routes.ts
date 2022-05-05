export const Routes = {
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

export const withParameters = (route: string, parameters: object) =>
	route
		.split("/")
		.reduce((result, part) =>
			result.concat(part.startsWith(":") ? `/${(parameters as any)[part.slice(1)]}` : `/${part}`)
		);
