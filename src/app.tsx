import { treact } from "@treact";
import { Component } from "./components/@types/component";
import { Layout } from "./components/layout";
import { Route } from "./components/route";
import { Router } from "./components/router";
import { URL } from "./constants/constants";
import { Feed } from "./views/feed";
import { Login } from "./views/login";
import { Signup } from "./views/signup";

export const App: Component = () => {
	return (
		<Layout>
			<Router routes={Object.values(URL)}>
				<Route path={URL.Signup} component={Signup} />
				<Route path={URL.Login} component={Login} />
				<Route path={URL.Feed} component={Feed} />
			</Router>
		</Layout>
	);
};
