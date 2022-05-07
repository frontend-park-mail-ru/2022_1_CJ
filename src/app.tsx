import { treact } from "@treact";
import { ProfileSettings } from "src/views/profile/profileSettings";
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
import { CommunitiesRegistry } from "src/views/communities/registry";
import { Component } from "src/core/treact/models";

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

			<CommunitiesRegistry />

			<Route to="" component={NotFound} />
		</Router>
	);
};
