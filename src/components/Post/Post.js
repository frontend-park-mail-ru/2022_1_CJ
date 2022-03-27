import { createComponent } from '../../core/models/Component/Component.js';

export const postComponent = (template) => createComponent(template);

const changeLike = (e) => {
    console.log(e.currnetTarget);
}

const getComments = (e) => {
    console.log(e.currnetTarget);
}
const openReposts = (e) => {
    console.log(e.currnetTarget);
}

const reducer = {
    setting: {},
    onShow: ({ post }) => {
        // const post = document.getElementById(post.id)
        // currPost = document.g
        const  {like, comment, repost} = getElementsByClassName('reactions').slice(0, 3);
        like.addEventListener('click', changeLike);
        comment.addEventListener('click', getComments);
        repost.addEventListener('click', openReposts);
    }
};