import { Component, treact } from "@treact";
import { Post } from "src/components/posts/post";
import { PostWrapper } from "src/core/@types/post";
import { postAPI } from "src/core/network/api/post";

export const PostPage: Component = ({ post_id }: { post_id: string }) => {
	const [post, setPost] = treact.useState(null as PostWrapper);

	treact.useEffect(() => {
		postAPI.getPost({ post_id }).then(setPost);
	}, []);

	if (!post) {
		return null;
	}

	return (
		<div className="d-middle">
			<Post postWrapper={post} />
		</div>
	);
};
