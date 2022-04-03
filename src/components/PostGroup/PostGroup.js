import { renderComponent } from '../../core/helpers/component.js';
import { handleError } from '../../core/helpers/errors.js';
import { createReaction } from '../../core/models/Action/Action.js';
import { createComponent } from '../../core/models/Component/Component.js';
import { actions, store, thunks } from '../../store/store.js';
import { ComponentsRegistry } from '../registry.js';

let postGroup;

const loadPosts = (element) => {
  // first-time check (need to check url somehow or sth else)
  // FIXME: need to check URL or sth else 
  if (document.querySelector('.feed-page')) {
    store.dispatch(thunks.user.getFeedPosts);
  } else {
    store.dispatch(thunks.user.getProfilePosts);
  }
  //
  store.once(
    createReaction(actions.user.getPosts.success, ({ payload }) => {
      const { posts } = payload;
      const component = ComponentsRegistry.Post;
      Object.values(posts).forEach((post) => {
        element.insertAdjacentHTML('beforeend', renderComponent(component, { post }));
      });
    }),
    createReaction(actions.user.getPosts.failure, ({ payload }) => handleError(payload.err))
  );
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
// 
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
