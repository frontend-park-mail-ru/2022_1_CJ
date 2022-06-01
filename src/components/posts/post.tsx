import { Component, treact } from "@treact";
import { DropdownMenuComponent } from "src/components/@helpers/dropdown";
import { showImageAttachments } from "src/components/attachments/images";
import { EditCommunityPost } from "src/components/communities/editPost";
import { Navigate } from "src/components/link";
import { PostAuthorComponent } from "src/components/posts/author";
import { EditPost } from "src/components/posts/editPost";
import { PostLikeButton } from "src/components/posts/likeButton";
import { Routes, withParameters } from "src/constants/routes";
import { PostWrapper } from "src/core/@types/post";
import { communitiesAPI } from "src/core/network/api/communities";
import { apiPostDeletePost } from "src/core/network/api/post/delete";
import { useUserStore } from "src/stores/user";

export const PostComponent: Component = ({
	postWrapper,
	disableNavigate,
}: {
	postWrapper: PostWrapper;
	disableNavigate: boolean;
}) => {
	const [userStore] = useUserStore();
	const update = treact.useUpdate();
	const { post } = postWrapper;

	const deletePost = () => {
		apiPostDeletePost({ post_id: post.id }).then(update);
	};

	const deleteCommunityPost = () => {
		communitiesAPI.deletePost({ community_id: post.author.id, post_id: post.id }).then(update);
	};

	const isAuthor = post.author.id === userStore.user.id;
	const isFromManagedCommunity = userStore.managedCommunities.some((community) => community.id === post.author.id);

	const deleteButton = () => {
		if (isAuthor) {
			return (
				<span onClick={deletePost} className="btn btn-negative">
					Delete
				</span>
			);
		}

		if (isFromManagedCommunity) {
			return (
				<span onClick={deleteCommunityPost} className="btn btn-negative">
					Delete
				</span>
			);
		}

		return null;
	};

	const editButton = () => {
		if (isAuthor) {
			return <EditPost post={post} />;
		} else if (isFromManagedCommunity) {
			return <EditCommunityPost post={post} />;
		}
		return null;
	};

	const showAttachments = (attachments: string[]) => {
		return attachments.map((attachment) => (
			<a rel="external" target="_blank" href={`/api/file/get?url=${attachment}`} className="link link-attachment">
				{attachment.slice(-10)}
			</a>
		));
	};

	return (
		<div className="post flex flex-c bg-white pd-8 border-sm" style="gap: 0.5rem;">
			<div className="flex flex-r items-center justify-between">
				<PostAuthorComponent post={post} />
				{(isAuthor || isFromManagedCommunity) && (
					<DropdownMenuComponent>
						{editButton()}
						{deleteButton()}
					</DropdownMenuComponent>
				)}
			</div>
			{disableNavigate && <p className="message">{post.message}</p>}
			{!disableNavigate && (
				<Navigate to={withParameters(Routes.Post, { post_id: post.id })}>
					<p className="message">{post.message}</p>
				</Navigate>
			)}
			{post.images && showImageAttachments(post.images)}
			{post.attachments && showAttachments(post.attachments)}
			<div className="flex flex-r">
				<PostLikeButton postWrapper={postWrapper} />
			</div>
		</div>
	);
};
