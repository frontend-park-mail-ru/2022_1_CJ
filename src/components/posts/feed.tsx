import { treact } from "@treact";
import { Component } from "src/components/@types/component";
import { Post } from "src/components/posts/post";
import { Spinner } from "src/components/spinner";
import { PostWrapper } from "src/core/@types/post";
import { userAPI } from "src/core/network/api/user";

export const FeedPosts: Component = () => {
	const [posts, setPosts] = treact.useState(null as PostWrapper[]);
	treact.useEffect(() => {
		userAPI.getFeed().then((response) => {
			setPosts(response.posts || []);
		});
	}, []);
	const map = (postWrapper: PostWrapper) => <Post postWrapper={postWrapper} />;
	if (posts) {
		return <div className="post flow d-middle">{posts.map(map)}</div>;
	}
	return <Spinner />;
};
