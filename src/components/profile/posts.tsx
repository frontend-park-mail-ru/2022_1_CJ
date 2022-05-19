import { treact, Component, ModalComponent } from "@treact";
import { Post } from "src/components/posts/post";
import { Spinner } from "src/components/spinner";
import { PostWrapper } from "src/core/@types/post";
import { userAPI } from "src/core/network/api/user";

export const ProfilePosts: Component = ({ user_id }: { user_id: string }) => {
	const [posts, setPosts] = treact.useState(null as PostWrapper[]);

	treact.useEffect(() => {
		userAPI.getPosts({ user_id }).then((response) => setPosts(response.posts));
	}, []);

	if (!posts) {
		return null;
	}

	const map = (postWrapper: PostWrapper) => <Post postWrapper={postWrapper} />;
	const list = () => (posts ? posts.map(map) : <Spinner />);

	return <div className="flow d-middle overflow">{list()}</div>;
};
