import { treact } from "@treact";
import { Component } from "src/components/@types/component";
import { Post } from "src/components/posts/post";
import { Spinner } from "src/components/spinner";
import { PostWrapper } from "src/core/@types/post";
import { communitiesAPI } from "src/core/network/api/communities";
import { userAPI } from "src/core/network/api/user";
import { useUserStore } from "src/stores/user";

export const FeedPosts: Component = () => {
	const [userStore, setUserStore] = useUserStore();
	const [posts, setPosts] = treact.useState(null as PostWrapper[]);

	treact.useEffect(() => {
		userAPI.getFeed().then((response) => {
			setPosts(response.posts || []);
		});
		communitiesAPI.getManagedCommunities({ user_id: userStore.user.id }).then((response) => {
			setUserStore({ ...userStore, managedCommunities: response.communities || [] });
		});
	}, []);

	const map = (postWrapper: PostWrapper) => <Post postWrapper={postWrapper} />;
	const list = () => (posts ? posts.map(map) : <Spinner />);

	return <div className="post flow d-middle">{list()}</div>;
};
