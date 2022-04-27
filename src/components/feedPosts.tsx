import { treact } from "@treact";
import { Post } from "src/core/@types/post";
import { userAPI } from "src/core/network/api/user";
import { Component } from "./@types/component";
import { PostComponent } from "./post";

export const FeedPosts: Component = () => {
	const [posts, setPosts] = treact.useState([] as Post[]);
	treact.useEffect(() => {
		userAPI.getFeed().then((response) => {
			console.log(response.posts);
			setPosts(response.posts);
		});
	}, []);
	const map = (post: Post) => <PostComponent post={post} />;
	return <>{posts.map(map)}</>;
};
