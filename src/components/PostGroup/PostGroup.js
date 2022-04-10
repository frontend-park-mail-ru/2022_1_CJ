import { renderComponent } from '../../core/helpers/component.js';
import { handleError } from '../../core/helpers/errors.js';
import { createReaction } from '../../core/models/Action/Action.js';
import { createComponent } from '../../core/models/Component/Component.js';
import { postAPI } from '../../core/network/api/post.js';
import { actions, store, thunks } from '../../store/store.js';
import { ComponentsRegistry } from '../registry.js';

let postGroup;

const loadFeedPosts = (element) => {
  store.dispatch(thunks.user.getFeedPostIDs);
  store.once(
    createReaction(actions.user.getFeedPostIDs.success, ({ payload }) => {
      const postIDs = payload.feedPostIDs;
      console.log(payload);
      const component = ComponentsRegistry.Post;
      Object.values(postIDs).forEach(async (postID) => {
        const json = await postAPI.getPost(postID);
        element.insertAdjacentHTML('beforeend', renderComponent(component, { post: json.post }));
      });
    }),
    createReaction(actions.user.getFeedPostIDs.failure, ({ payload }) => handleError(payload.err))
  );
};

const loadProfilePosts = (element) => {
  store.dispatch(thunks.user.getProfilePosts);
};

const loadPosts = (element) => {
  if (document.querySelector('.feed-page')) {
    loadFeedPosts(element);
  } else {
    loadProfilePosts(element);
  }
};

const reducer = {
  onShow: () => {
    postGroup = document.getElementById('post-group');

    loadPosts(postGroup);

    let loading = false;
    postGroup.addEventListener('wheel', () => {
      if (!loading && isInViewport(postGroup.lastChild)) {
        loading = true;
        setTimeout(() => {
          loadPosts(postGroup);
          loading = false;
        }, 25); //redused await time (or we can increase it with increasing of posts count)
      }
    });
  }
};

// FIXME: scroll doesn't work as excpected
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export const postGroupComponent = (template) => createComponent(template, reducer);
