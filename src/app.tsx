import { treact } from "@treact";
import { Communities } from "src/views/communities/communities";
import { Community } from "src/views/communities/community";
import { CommunityCreate } from "src/views/communities/communityCreate";
import { ProfileSettings } from "src/views/profile/profileSettings";
import { Component } from "./components/@types/component";
import { Logout } from "./components/logout";
import { Route } from "./components/route";
import { Router } from "./components/router";
import { URL } from "./constants/constants";
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
			<Route to={URL.CommunitySettings} component={CommunitySettings} />

			<Route to="" component={NotFound} />
		</Router>
	);
};
