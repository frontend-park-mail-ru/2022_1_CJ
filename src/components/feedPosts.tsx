import { treact } from "@treact";
import { Spinner } from "src/components/spinner";
import { PostWrapper } from "src/core/@types/post";
import { userAPI } from "src/core/network/api/user";
import { Component } from "./@types/component";
import { PostComponent } from "./post";

export const FeedPosts: Component = () => {
	const [posts, setPosts] = treact.useState([] as PostWrapper[]);
	treact.useEffect(() => {
		userAPI.getFeed().then((response) => {
			setPosts(response.posts);
		});
	}, []);
	const map = (postWrapper: PostWrapper) => <PostComponent postWrapper={postWrapper} />;
	if (posts) {
		return <div className="post flow d-middle">{posts.map(map)}</div>;
	}
	return <Spinner />;
};
