import { treact } from "@treact";
import { Communities } from "src/views/communities/communities";
import { Community } from "src/views/communities/community";
import { CommunityCreate } from "src/views/communities/communityCreate";
import { ProfileSettings } from "src/views/profile/profileSettings";
import { Component } from "./components/@types/component";
import { Logout } from "./components/logout";
import { Route } from "./components/route";
import { Router } from "./components/router";
import { Routes } from "./constants/routes";
import { Base } from "./views/base";
import { MessengerDialog } from "./views/messenger/dialog";
import { Feed } from "./views/feed";
import { Friends } from "./views/friends";
import { Login } from "./views/auth/login";
import { Messenger } from "./views/messenger/messenger";
import { NotFound } from "./views/notFound";
import { Profile } from "./views/profile/profile";
import { Signup } from "./views/auth/signup";
import { CommunitySettings } from "src/views/communities/settings";

export const App: Component = () => {
	return (
		<Router routes={Object.values(Routes)}>
			<Route to={Routes.Base} component={Base} />
			<Route to={Routes.Signup} component={Signup} />
			<Route to={Routes.Login} component={Login} />
			<Route to={Routes.Logout} component={Logout} />
			<Route to={Routes.Feed} component={Feed} />
			<Route to={Routes.Messenger} component={Messenger} />
			<Route to={Routes.Friends} component={Friends} />

			<Route to={Routes.Profile} component={Profile} />
			<Route to={Routes.ProfileSettings} component={ProfileSettings} />

			<Route to={Routes.Dialog} component={MessengerDialog} />

			<Route to={Routes.Community} component={Community} />
			<Route to={Routes.Communities} component={Communities} />
			<Route to={Routes.CommunityCreate} component={CommunityCreate} />
			<Route to={Routes.CommunitySettings} component={CommunitySettings} />

			<Route to="" component={NotFound} />
		</Router>
	);
};
