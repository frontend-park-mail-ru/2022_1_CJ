import { treact } from "@treact";
import { Component } from "src/core/treact/models";
import { Route } from "src/components/route";
import { Routes } from "src/constants/routes";
import { Communities } from "src/views/communities/communities";
import { Community } from "src/views/communities/community";
import { CommunityCreate } from "src/views/communities/communityCreate";
import { CommunitySettings } from "src/views/communities/settings";

export const CommunitiesRegistry: Component = () => {
	return (
		<>
			<Route to={Routes.Community} component={Community} />
			<Route to={Routes.Communities} component={Communities} />
			<Route to={Routes.CommunityCreate} component={CommunityCreate} />
			<Route to={Routes.CommunitySettings} component={CommunitySettings} />
		</>
	);
};
