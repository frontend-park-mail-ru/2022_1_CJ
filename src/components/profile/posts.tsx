import { Component, treact } from "@treact";
import { PostComponent } from "src/components/posts/post";
import { Spinner } from "src/components/spinner";
import { PostWrapper } from "src/core/@types/post";
import { userAPI } from "src/core/network/api/user";

export const ProfilePosts: Component = ({ user_id }: { user_id: string }) => {
	const [posts, setPosts] = treact.useState(null as PostWrapper[]);

	treact.useEffect(() => {
		userAPI.getPosts({ user_id }).then((response) => setPosts(response.posts || []));
	}, [user_id]);

	if (!posts) {
		return null;
	}

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

	return (
		<div className="flex flex-c" style="width: min(100%, 60ch);">
			{list()}
		</div>
	);
};
