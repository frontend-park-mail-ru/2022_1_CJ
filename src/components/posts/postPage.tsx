import { Component, treact } from "@treact";
import { CommentComponent } from "src/components/comments/comment";
import { PostComponent } from "src/components/posts/post";
import { Post, PostWrapper } from "src/core/@types/post";
import { createComment } from "src/core/network/api/comments/create";
import { getComments } from "src/core/network/api/comments/get";
import { postAPI } from "src/core/network/api/post";

export const PostPage: Component = ({ post_id }: { post_id: string }) => {
	const [post, setPost] = treact.useState(null as PostWrapper);
	const [comments, setComments] = treact.useState(null as Post[]);

	const fetchComments = () => {
		getComments({ post_id }).then((response) => setComments(response.comments || []));
	};

	treact.useEffect(() => {
		postAPI.getPost({ post_id }).then(setPost);
		fetchComments();
	}, []);

	if (!post || !comments) {
		return null;
	}

	const postComment = () => {
		const input = document.getElementById("comment");
		const message = input.innerText;
		if (message.length > 0) {
			input.innerText = "";
			createComment({ post_id, message }).then(fetchComments);
		}
	};

	return (
		<div className="flex flex-c d-middle">
			<PostComponent postWrapper={post} />
			<div className="flex" style="gap: 0;">
				<div id="comment" className="grow bg-white break-word" style="max-height: 5rem;" contentEditable />
				<button onClick={postComment} className="btn btn-white border">
					send
				</button>
			</div>
			{comments.map((comment) => (
				<CommentComponent post_id={post_id} comment={comment} />
			))}
		</div>
	);
};
