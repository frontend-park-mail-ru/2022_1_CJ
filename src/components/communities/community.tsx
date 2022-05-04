import { treact } from "@treact";
import { Component } from "src/components/@types/component";
import { CreateCommunityPost } from "src/components/communities/createPost";
import { Spinner } from "src/components/spinner";
import { Community } from "src/core/@types/community";
import { communitiesAPI } from "src/core/network/api/communities";
import { useUserStore } from "src/stores/user";

export const CommunityComponent: Component = ({ community_id }: { community_id: string }) => {
	const [userStore] = useUserStore();
	const [community, setCommunity] = treact.useState(null as Community);

	treact.useEffect(async () => {
		const response = await communitiesAPI.getCommunity({ community_id });
		setCommunity(response.community);
	}, []);

	if (community) {
		const isAdmin = community.admins.some((user) => user.id === userStore.user.id);
		return (
			<div className="flex flex-c">
				<p className="text-lg">{community.name}</p>
				<p>{community.info}</p>
				{isAdmin && <CreateCommunityPost community_id={community_id} />}
			</div>
		);
	}

	return <Spinner />;
};
