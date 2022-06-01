import { Component, treact } from "@treact";
import { PostComponent } from "src/components/posts/post";
import { Spinner } from "src/components/spinner";
import { PostWrapper } from "src/core/@types/post";
import { communitiesAPI } from "src/core/network/api/communities";
import { apiUserGetFeed } from "src/core/network/api/user/getFeed";
import { useUserStore } from "src/stores/user";

export const FeedPosts: Component = () => {
	const [userStore, modUserStore] = useUserStore();
	const [posts, setPosts] = treact.useState(null as PostWrapper[]);

	treact.useEffect(() => {
		apiUserGetFeed().then((response) => {
			setPosts(response.posts || []);
		});
		communitiesAPI.getManagedCommunities({ user_id: userStore.user.id }).then((response) => {
			modUserStore.update({ managedCommunities: response.communities || [] });
		});
	}, []);

	const map = (postWrapper: PostWrapper) => <PostComponent postWrapper={postWrapper} />;
	const list = () => (posts ? posts.map(map) : <Spinner />);

	return <div className="flex flex-c grow overflow items-center">{list()}</div>;
};
