import { treact } from "@treact";
import { Component } from "./components/@types/component";
import { Layout } from "./components/layout";
import { Logout } from "./components/logout";
import { Route } from "./components/route";
import { Router } from "./components/router";
import { URL } from "./constants/constants";
import { Feed } from "./views/feed";
import { Login } from "./views/login";
import { NotFound } from "./views/notFound";
import { Signup } from "./views/signup";

export const App: Component = () => {
	return (
		<Layout>
			<Router routes={Object.values(URL)}>
				<Route to={URL.Signup} component={Signup} />
				<Route to={URL.Login} component={Login} />
				<Route to={URL.Logout} component={Logout} />
				<Route to={URL.Feed} component={Feed} />
				<Route to="" component={NotFound} />
			</Router>
		</Layout>
	);
};
