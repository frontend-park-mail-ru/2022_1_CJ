import { Component, treact } from "@treact";
import { DateFromTimestamp } from "src/components/@helpers/date";
import { UserProfileLink } from "src/components/@helpers/links";
import { EditCommentComponent } from "src/components/comments/editComment";
import { Post } from "src/core/@types/post";
import { deleteComment } from "src/core/network/api/comments/delete";
import { useUserStore } from "src/stores/user";

export const CommentComponent: Component = ({ post_id, comment }: { post_id: string; comment: Post }) => {
	const [userStore] = useUserStore();
	const update = treact.useUpdate();

	const deletePost = () => {
		deleteComment({ post_id, comment_id: comment.id }).then(update);
	};

	const deleteButton = () => {
		if (comment.author.id === userStore.user.id) {
			return (
				<button onClick={deletePost} className="btn btn-negative">
					Delete
				</button>
			);
		}
		return null;
	};

	const editButton = () => {
		if (comment.author.id === userStore.user.id) {
			return <EditCommentComponent post_id={post_id} comment={comment} />;
		}
		return null;
	};

	return (
		<div className="flex flex-c bg-white pd-4 border-sm">
			<div className="flex flex-r items-center">
				<img className="avatar" src={comment.author.image} alt="" />
				<UserProfileLink user={comment.author} />
				<DateFromTimestamp timestamp={comment.created_at} />
			</div>
			{comment.message}
			<div className="flex flex-r">
				{deleteButton()}
				{editButton()}
			</div>
		</div>
	);
};
