import { Component, treact } from "@treact";
import { ControlButton } from "src/components/communities/controlButton";
import { CreateCommunityPost } from "src/components/communities/createPost";
import { CommunityInformaitonComponent } from "src/components/communities/information";
import { Navigate } from "src/components/link";
import { PostComponent } from "src/components/posts/post";
import { Spinner } from "src/components/spinner";
import { Routes, withParameters } from "src/constants/routes";
import { Community } from "src/core/@types/community";
import { PostWrapper } from "src/core/@types/post";
import { apiCommunitiesGet } from "src/core/network/api/communities/get";
import { apiCommunitiesGetManaged } from "src/core/network/api/communities/getManaged";
import { apiCommunitiesGetPosts } from "src/core/network/api/communities/getPosts";
import { useUserStore } from "src/stores/user";

export const CommunityComponent: Component<{ community_id: string }> = ({ community_id }) => {
	const [userStore, modUserStore] = useUserStore();
	const [community, setCommunity] = treact.useState<Community>();
	const [posts, setPosts] = treact.useState<PostWrapper[]>();

	treact.useEffect(async () => {
		apiCommunitiesGet({ community_id }).then((response) => setCommunity(response.community));
		apiCommunitiesGetPosts({ community_id }).then((response) => setPosts(response.posts || []));
		apiCommunitiesGetManaged({ user_id: userStore.user.id }).then((response) => {
			modUserStore.update({ managedCommunities: response.communities || [] });
		});
	}, [community_id]);

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

	if (community) {
		const isAdmin = community.admins?.some((user) => user.id === userStore.user.id);
		return (
			<div className="flex flex-c grow d-middle">
				<CommunityInformaitonComponent community={community} />
				{!isAdmin && <ControlButton community_id={community_id} />}
				{isAdmin && (
					<div className="flex flex-r">
						<div className="d-middle">
							<Navigate to={withParameters(Routes.CommunitySettings, { community_id })}>
								<div className="btn btn-white d-middle">Settings</div>
							</Navigate>
						</div>
						<CreateCommunityPost community_id={community_id} />
					</div>
				)}
				<div className="flex flex-c items-center">{list()}</div>
			</div>
		);
	}

	return <Spinner />;
};
