import { Component, treact } from "@treact";
import { ControlButton } from "src/components/communities/controlButton";
import { CreateCommunityPost } from "src/components/communities/createPost";
import { Link } from "src/components/link";
import { PostComponent } from "src/components/posts/post";
import { Spinner } from "src/components/spinner";
import { Routes, withParameters } from "src/constants/routes";
import { Community } from "src/core/@types/community";
import { PostWrapper } from "src/core/@types/post";
import { communitiesAPI } from "src/core/network/api/communities";
import { useUserStore } from "src/stores/user";

export const CommunityComponent: Component = ({ community_id }: { community_id: string }) => {
	const [userStore, modUserStore] = useUserStore();
	const [community, setCommunity] = treact.useState(null as Community);
	const [posts, setPosts] = treact.useState(null as PostWrapper[]);

	treact.useEffect(async () => {
		communitiesAPI.getCommunity({ community_id }).then((response) => setCommunity(response.community));
		communitiesAPI.getCommunityPosts({ community_id }).then((response) => setPosts(response.posts || []));
		communitiesAPI.getManagedCommunities({ user_id: userStore.user.id }).then((response) => {
			modUserStore.update({ managedCommunities: response.communities || [] });
		});
	}, []);

	const map = (postWrapper: PostWrapper) => <PostComponent postWrapper={postWrapper} />;
	const list = () => {
		if (posts) {
			if (posts.length > 0) {
				return posts.map(map);
			}
			return <p className="text-center text-light">Yet no posts</p>;
		}
		return <Spinner />;
	};

	if (community) {
		const isAdmin = community.admins?.some((user) => user.id === userStore.user.id);
		return (
			<div className="flex flex-c grow d-middle">
				<p className="fs-lg">{community.name}</p>
				<p>{community.info}</p>
				{!isAdmin && <ControlButton community_id={community_id} />}
				{isAdmin && <Link to={withParameters(Routes.CommunitySettings, { community_id })}>Settings</Link>}
				{isAdmin && <CreateCommunityPost community_id={community_id} />}
				<div className="flex flex-c items-center">{list()}</div>
			</div>
		);
	}

	return <Spinner />;
};
