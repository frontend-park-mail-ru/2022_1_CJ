import { Component, treact } from "@treact";
import { Icons } from "src/constants/icons";
import { PostWrapper } from "src/core/@types/post";
import { likeAPI } from "src/core/network/api/like";

export const PostLikeButton: Component = ({ postWrapper }: { postWrapper: PostWrapper }) => {
	const [likes, setLikes] = treact.useState(postWrapper.likes);
	const iconSrc = likes.my_like ? Icons.LikePressed : Icons.Like;

	const toggleLike = () => {
		const post_id = postWrapper.post.id;
		const method = likes.my_like ? likeAPI.reduce : likeAPI.increase;
		method({ post_id }).then(async () => {
			const response = await likeAPI.getPostLikes({ post_id });
			setLikes(response.likes);
		});
	};

	return (
		<div className="flex flex-r items-center" style="gap: 0.125rem;">
			<img onClick={toggleLike} src={iconSrc} alt="" className="icon" />
			<p className="text-light unselectable">{likes.amount}</p>
		</div>
	);
};
