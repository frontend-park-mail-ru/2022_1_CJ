import { treact } from "@treact";
import { navigateTo } from "src/components/@helpers/router";
import { decodeEntity } from "src/components/@helpers/utils";
import { Component } from "src/core/treact/models";
import { PostAuthorComponent } from "src/components/posts/author";
import { PostLikeButton } from "src/components/posts/likeButton";
import { Routes } from "src/constants/routes";
import { PostWrapper } from "src/core/@types/post";
import { communitiesAPI } from "src/core/network/api/communities";
import { postAPI } from "src/core/network/api/post";
import { useUserStore } from "src/stores/user";
import { DateFromTimestamp } from "src/components/@helpers/date";

export const Post: Component = ({ postWrapper }: { postWrapper: PostWrapper }) => {
	const [userStore] = useUserStore();
	const { post } = postWrapper;

	// TODO: add a better way to refresh
	const deletePost = () => {
		postAPI.deletePost({ post_id: post.id }).then(() => navigateTo(Routes.Base));
	};

	const deleteCommunityPost = () => {
		communitiesAPI.deletePost({ community_id: post.author.id, post_id: post.id }).then(() => navigateTo(Routes.Base));
	};

	const deleteButton = () => {
		if (post.author.id === userStore.user.id) {
			return (
				<button onClick={deletePost} className="btn btn-negative">
					Delete post
				</button>
			);
		}

		if (userStore.managedCommunities.some((community) => community.id === post.author.id)) {
			return (
				<button onClick={deleteCommunityPost} className="btn btn-negative">
					Delete community post
				</button>
			);
		}

		return null;
	};

	return (
		<div className="flow bg-white pd-8 border-sm" style="max-width: 75ch;">
			<div className="flex flex-r items-center">
				<PostAuthorComponent author={post.author} />
				<DateFromTimestamp timestamp={post.created_at} />
			</div>
			<p className="break-word">{decodeEntity(post.message)}</p>
			<div className="flex flex-r">
				<PostLikeButton postWrapper={postWrapper} />
				{deleteButton()}
			</div>
		</div>
	);
};
