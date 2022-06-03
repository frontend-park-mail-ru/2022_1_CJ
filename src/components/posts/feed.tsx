import { Component, treact } from "@treact";
import { CreatePost } from "src/components/posts/createPost";
import { PostComponent } from "src/components/posts/post";
import { Spinner } from "src/components/spinner";
import { PostWrapper } from "src/core/@types/post";
import { apiCommunitiesGetManaged } from "src/core/network/api/communities/getManaged";
import { apiUserGetFeed } from "src/core/network/api/user/getFeed";
import { useUserStore } from "src/stores/user";

export const FeedPosts: Component = () => {
	const [userStore, modUserStore] = useUserStore();
	const [posts, setPosts] = treact.useState<PostWrapper[]>();
	const [page, setPage] = treact.useState(1);

	const limit = 10;
	const [amountOfPages, setAmountOfPages] = treact.useState(1);

	treact.useEffect(() => {
		apiCommunitiesGetManaged({ user_id: userStore.user.id }).then((response) => {
			modUserStore.update({ managedCommunities: response.communities || [] });
		});
	}, []);

	treact.useEffect(() => {
		if (page > amountOfPages) {
			return;
		}

		apiUserGetFeed({ page, limit }).then((response) => {
			setAmountOfPages(response.amount_pages);
			if (posts) {
				setPosts([...posts, ...(response.posts || [])]);
			} else {
				setPosts(response.posts || []);
			}
		});
	}, [page]);

	const handleObserver: IntersectionObserverCallback = (entries) => {
		const target = entries[0];
		if (target.isIntersecting) {
			setPage(page + 1);
		}
	};

	treact.useEffect(() => {
		const observer = new IntersectionObserver(handleObserver, {
			root: null,
			rootMargin: "0px",
			threshold: 0,
		});
		const loader = document.getElementById("loader");
		if (loader) {
			observer.observe(loader);
		}
	}, [posts]);

	const map = (postWrapper: PostWrapper) => <PostComponent postWrapper={postWrapper} />;
	const list = () => {
		if (!posts) {
			return <Spinner />;
		}
		return (
			<>
				{posts.map(map)}
				<div id="loader">{page > amountOfPages ? "" : "..."}</div>
			</>
		);
	};

	return (
		<div className="flex flex-c grow overflow items-center">
			<CreatePost />
			{list()}
		</div>
	);
};
