import { Component, treact } from "@treact";
import { DateFromTimestamp } from "src/components/@helpers/date";
import { DropdownMenuComponent } from "src/components/@helpers/dropdown";
import { UserProfileLink } from "src/components/@helpers/links";
import { EditCommentComponent } from "src/components/comments/editComment";
import { Post } from "src/core/@types/post";
import { User } from "src/core/@types/user";
import { deleteComment } from "src/core/network/api/comments/delete";
import { useUserStore } from "src/stores/user";

export const CommentComponent: Component<{ post_id: string; comment: Post }> = ({ post_id, comment }) => {
	const [userStore] = useUserStore();
	const update = treact.useUpdate();

	const deletePost = () => {
		deleteComment({ post_id, comment_id: comment.id }).then(update);
	};

	const isAuthor = comment.author.id === userStore.user.id;

	const deleteButton = () => (
		<button onClick={deletePost} className="btn btn-negative">
			Delete
		</button>
	);

	const editButton = () => <EditCommentComponent post_id={post_id} comment={comment} />;

	return (
		<div className="post flex flex-c bg-white pd-4 border-sm">
			<div className="flex flex-r items-center justify-between">
				<div className="flex flex-r items-center">
					<img className="avatar" src={comment.author.image} alt="" />
					<UserProfileLink user={comment.author as any as User} />
					<DateFromTimestamp timestamp={comment.created_at} />
				</div>
				{isAuthor && (
					<DropdownMenuComponent>
						{editButton()}
						{deleteButton()}
					</DropdownMenuComponent>
				)}
			</div>
			<p className="message">{comment.message}</p>
		</div>
	);
};
