import { Component, treact } from "@treact";
import { navigateTo } from "src/components/@helpers/router";
import { CommentComponent } from "src/components/comments/comment";
import { PostComponent } from "src/components/posts/post";
import { Routes } from "src/constants/routes";
import { Post, PostWrapper } from "src/core/@types/post";
import { createComment } from "src/core/network/api/comments/create";
import { getComments } from "src/core/network/api/comments/get";
import { postAPI } from "src/core/network/api/post";

export const PostPage: Component = ({ post_id }: { post_id: string }) => {
	const [postWrapper, setPostWrapper] = treact.useState(null as PostWrapper);
	const [comments, setComments] = treact.useState(null as Post[]);

	const fetchComments = () => {
		getComments({ post_id }).then((response) => setComments(response.comments || []));
	};

	treact.useEffect(() => {
		postAPI.getPost({ post_id }).then(setPostWrapper, () => navigateTo(Routes.Feed));
		fetchComments();
	}, []);

	if (!postWrapper || !comments) {
		return null;
	}

	const postComment = () => {
		const input = document.getElementById("comment");
		const message = input.innerText;
		if (message.length > 0) {
			input.innerText = "";
			createComment({ post_id, message }).then(() => {
				fetchComments();
				postAPI.getPost({ post_id }).then(setPostWrapper);
			});
		}
	};

	const showComments = () => {
		if (comments.length > 0) {
			return (
				<div className="dialog flex flex-c grow overflow">
					<p className="text-center text-light">{postWrapper.post.count_comments} comments</p>
					{comments.map((comment) => (
						<CommentComponent post_id={post_id} comment={comment} />
					))}
				</div>
			);
		}
		return <p className="text-center text-light">Yet no comments</p>;
	};

	return (
		<div className="flex flex-c overflow d-middle">
			<div className="flex flex-c items-center">
				<PostComponent postWrapper={postWrapper} />
			</div>
			<div className="flex" style="gap: 0;">
				<div id="comment" className="grow bg-white break-word" style="max-height: 5rem;" contentEditable />
				<button onClick={postComment} className="btn btn-white border">
					send
				</button>
			</div>
			{showComments()}
		</div>
	);
};
