import { Component, treact } from "@treact";
import { Alert } from "src/components/@helpers/alert";
import { Logout } from "src/components/logout";
import { Route } from "src/components/route";
import { Router } from "src/components/router";
import { Routes } from "src/constants/routes";
import { Login } from "src/views/auth/login";
import { Signup } from "src/views/auth/signup";
import { Base } from "src/views/base";
import { CommunitiesRegistry } from "src/views/communities/registry";
import { Friends } from "src/views/friends";
import { MessengerDialog } from "src/views/messenger/dialog";
import { Messenger } from "src/views/messenger/messenger";
import { NotFound } from "src/views/notFound";
import { Offline } from "src/views/offline";
import { Feed } from "src/views/posts/feed";
import { Post } from "src/views/posts/post";
import { Profile } from "src/views/profile/profile";
import { ProfileSettings } from "src/views/profile/profileSettings";

export const App: Component = () => {
	return (
		<>
			<Router>
				<Route to={Routes.Base} component={Base} />
				<Route to={Routes.Signup} component={Signup} />
				<Route to={Routes.Login} component={Login} />
				<Route to={Routes.Logout} component={Logout} />
				<Route to={Routes.Friends} component={Friends} />

				<Route to={Routes.Feed} component={Feed} />
				<Route to={Routes.Post} component={Post} />

				<Route to={Routes.Profile} component={Profile} />
				<Route to={Routes.ProfileSettings} component={ProfileSettings} />

				<Route to={Routes.Messenger} component={Messenger} />
				<Route to={Routes.Dialog} component={MessengerDialog} />

				<CommunitiesRegistry />

				<Route to="" component={NotFound} />

				<Route to={Routes.Offline} component={Offline} />
			</Router>
			<Alert />
		</>
	);
};
