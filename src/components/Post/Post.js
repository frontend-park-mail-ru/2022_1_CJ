import { createComponent } from '../../core/models/Component/Component.js';
import { store, thunks } from '../../store/store.js';
import { ComponentsRegistry } from '../registry.js';

const reducer = {
  post: {},
  onShow: ({ post }) => {
    // context: post{author id, likes, ...}
    post = document.getElementById(post.id);
    store.dispatch(thunks.user.getFeedPosts);
  },
  onAction: ({ type, payload }) => {
    if (type === 'likePostSuccess' && payload.post.id === post.id) {
      // color button
    }
  }
};

const addPosts = (posts) => {
  const postComponent = ComponentsRegistry.Post;
  document.getElementById('posts').appendChild = postComponent.render(posts[0]);
};

export const postComponent = (template) => createComponent(template, reducer);
