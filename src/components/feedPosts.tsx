import { treact } from "@treact";
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
	return <div className="flex flex-c d-middle">{posts && posts.map(map)}</div>;
};
