import { treact } from "@treact";
import { ProfileSettings } from "src/views/profile/profileSettings";
import { Logout } from "src/components/logout";
import { Route } from "src/components/route";
import { Router } from "src/components/router";
import { Routes } from "src/constants/routes";
import { Base } from "src/views/base";
import { MessengerDialog } from "src/views/messenger/dialog";
import { Feed } from "src/views/feed";
import { Friends } from "src/views/friends";
import { Login } from "src/views/auth/login";
import { Messenger } from "src/views/messenger/messenger";
import { NotFound } from "src/views/notFound";
import { Profile } from "src/views/profile/profile";
import { Signup } from "src/views/auth/signup";
import { CommunitiesRegistry } from "src/views/communities/registry";
import { Component } from "src/core/treact/models";
import { Alert } from "src/components/@helpers/alert";

export const App: Component = () => {
	return (
		<>
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
			<Alert />
		</>
	);
};
