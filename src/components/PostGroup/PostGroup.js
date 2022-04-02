import { renderComponent } from '../../core/helpers/component.js';
import { handleError } from '../../core/helpers/errors.js';
import { createReaction } from '../../core/models/Action/Action.js';
import { createComponent } from '../../core/models/Component/Component.js';
import { actions, store, thunks } from '../../store/store.js';
import { ComponentsRegistry } from '../registry.js';

let postGroup;

const loadPosts = (element) => {
  store.dispatch(thunks.user.getFeedPosts);
  store.once(
    createReaction(actions.user.getFeedPosts.success, ({ payload }) => {
      const { posts } = payload;
      const component = ComponentsRegistry.Post;
      Object.values(posts).forEach((post) => {
        element.insertAdjacentHTML('beforeend', renderComponent(component, { post }));
      });
    }),
    createReaction(actions.user.getFeedPosts.failure, ({ payload }) => handleError(payload.err))
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
        }, 1000);
      }
    });
  }
};

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
