import { treact } from "@treact";
import { Component } from "src/core/treact/models";
import { PostWrapper } from "src/core/@types/post";
import { likeAPI } from "src/core/network/api/like";

export const PostLikeButton: Component = ({ postWrapper }: { postWrapper: PostWrapper }) => {
	const [likes, setLikes] = treact.useState(postWrapper.likes);

	const iconSrc = likes.my_like ? "/static/icons/like_pressed.svg" : "/static/icons/like.svg";

	const toggleLike = () => {
		const post_id = postWrapper.post.id;
		const method = likes.my_like ? likeAPI.reduce : likeAPI.increase;
		method({ post_id }).then(async () => {
			const response = await likeAPI.getPostLikes({ post_id });
			setLikes(response.likes);
		});
	};

	return (
		<div className="flex flex-r items-center">
			<img onClick={toggleLike} src={iconSrc} alt="" className="icon pointer" />
			<p className="text-light unselectable">{likes.amount}</p>
		</div>
	);
};
