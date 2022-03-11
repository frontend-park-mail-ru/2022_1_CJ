import { } from '../api/post.js';
import { AuthEvents, EventBus, EventBusChannels } from '../../modules/EventBus.js';

export const PostService = {
  /**
   * @param {PostDTO} dto
   */
  async SignupUser(dto) {
    const response = await AuthAPI.SignupUser(dto);
    if (!response) {
      EventBus.emit(EventBusChannels.Auth, AuthEvents.SignupFailure);
    } else {
      EventBus.emit(EventBusChannels.Auth, AuthEvents.SignupSuccess);
    }
  },
};