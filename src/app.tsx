import { treact } from "@treact";
import { Communities } from "src/views/communities";
import { Community } from "src/views/community";
import { CommunityCreate } from "src/views/communityCreate";
import { ProfileSettings } from "src/views/profileSettings";
import { Component } from "./components/@types/component";
import { Logout } from "./components/logout";
import { Route } from "./components/route";
import { Router } from "./components/router";
import { URL } from "./constants/constants";
import { Base } from "./views/base";
import { MessengerDialog } from "./views/dialog";
import { Feed } from "./views/feed";
import { Friends } from "./views/friends";
import { Login } from "./views/login";
import { Messenger } from "./views/messenger";
import { NotFound } from "./views/notFound";
import { Profile } from "./views/profile";
import { Signup } from "./views/signup";

export const App: Component = () => {
	return (
		<Router routes={Object.values(URL)}>
			<Route to={URL.Base} component={Base} />
			<Route to={URL.Signup} component={Signup} />
			<Route to={URL.Login} component={Login} />
			<Route to={URL.Logout} component={Logout} />
			<Route to={URL.Feed} component={Feed} />
			<Route to={URL.Messenger} component={Messenger} />
			<Route to={URL.Friends} component={Friends} />

			<Route to={URL.Profile} component={Profile} />
			<Route to={URL.ProfileSettings} component={ProfileSettings} />

			<Route to={URL.Dialog} component={MessengerDialog} />

			<Route to={URL.Community} component={Community} />
			<Route to={URL.Communities} component={Communities} />
			<Route to={URL.CommunityCreate} component={CommunityCreate} />

			<Route to="" component={NotFound} />
		</Router>
	);
};
