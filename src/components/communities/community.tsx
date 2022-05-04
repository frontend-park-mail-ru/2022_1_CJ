import { treact } from "@treact";
import { Component } from "src/components/@types/component";
import { CreateCommunityPost } from "src/components/communities/createPost";
import { Link } from "src/components/link";
import { Post } from "src/components/posts/post";
import { Spinner } from "src/components/spinner";
import { URL, urlWithParameters } from "src/constants/constants";
import { Community } from "src/core/@types/community";
import { PostWrapper } from "src/core/@types/post";
import { communitiesAPI } from "src/core/network/api/communities";
import { useUserStore } from "src/stores/user";

export const CommunityComponent: Component = ({ community_id }: { community_id: string }) => {
	const [userStore] = useUserStore();
	const [community, setCommunity] = treact.useState(null as Community);
	const [posts, setPosts] = treact.useState(null as PostWrapper[]);

	treact.useEffect(async () => {
		communitiesAPI.getCommunity({ community_id }).then((response) => setCommunity(response.community));
		communitiesAPI.getCommunityPosts({ community_id }).then((response) => setPosts(response.posts));
	}, []);

	const map = (postWrapper: PostWrapper) => <Post postWrapper={postWrapper} />;
	const list = () => (posts ? posts.map(map) : <Spinner />);

	if (community) {
		const isAdmin = community.admins.some((user) => user.id === userStore.user.id);
		return (
			<div className="flex flex-c d-middle">
				<p className="text-lg">{community.name}</p>
				<p>{community.info}</p>
				{isAdmin && <Link to={urlWithParameters(URL.CommunitySettings, { community_id })}>Settings</Link>}
				{isAdmin && <CreateCommunityPost community_id={community_id} />}
				<div className="flow">
					<p>Posts:</p>
					<div className="post flow d-middle">{list()}</div>
				</div>
			</div>
		);
	}

	return <Spinner />;
};
