import { Component, treact } from "@treact";
import { decodeEntity } from "src/components/@helpers/utils";
import { EditCommunityPost } from "src/components/communities/editPost";
import { Navigate } from "src/components/link";
import { PostAuthorComponent } from "src/components/posts/author";
import { EditPost } from "src/components/posts/editPost";
import { PostLikeButton } from "src/components/posts/likeButton";
import { Routes, withParameters } from "src/constants/routes";
import { PostWrapper } from "src/core/@types/post";
import { communitiesAPI } from "src/core/network/api/communities";
import { postAPI } from "src/core/network/api/post";
import { useUserStore } from "src/stores/user";

export const PostComponent: Component = ({ postWrapper }: { postWrapper: PostWrapper }) => {
	const [userStore] = useUserStore();
	const update = treact.useUpdate();
	const { post } = postWrapper;

	const deletePost = () => {
		postAPI.deletePost({ post_id: post.id }).then(update);
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

	const showImageAttachments = (images: string[]) => {
		return images.map((image) => <img style="width: 100%;" className="border-sm" src={image} alt="" />);
	};

	return (
		<div className="flow bg-white pd-8 border-sm" style="width: min(100%, 60ch);">
			<div className="flex flex-r items-center justify-between">
				<PostAuthorComponent post={post} />
				{(isAuthor || isFromManagedCommunity) && (
					<span className="dropdown">
						👀
						<span className="dropdown-content border border-sm bg-white" style="right: 0;">
							<div className="flex flex-c">
								{deleteButton()}
								{editButton()}
							</div>
						</span>
					</span>
				)}
			</div>
			<Navigate to={withParameters(Routes.Post, { post_id: post.id })}>
				<p className="break-word pre-wrap">{decodeEntity(post.message)}</p>
			</Navigate>
			{post.images && showImageAttachments(post.images)}
			{post.attachments && showAttachments(post.attachments)}
			<div className="flex flex-r">
				<PostLikeButton postWrapper={postWrapper} />
			</div>
		</div>
	);
};
