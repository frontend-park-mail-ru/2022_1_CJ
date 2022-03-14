import { AuthAPI } from '../api/auth.js';
import { AuthEvents, EventBus, EventBusChannels } from '../../modules/EventBus.js';

export const AuthService = {
  /**
   * @param {SignupUserDTO} dto
   */
  async SignupUser(dto) {
    const [json, err] = await AuthAPI.SignupUser(dto);
    if (err) {
      console.log(err, json);
      EventBus.emit(EventBusChannels.Auth, AuthEvents.SignupFailure);
    } else {
      EventBus.emit(EventBusChannels.Auth, AuthEvents.SignupSuccess);
    }
  },

  /**
   * @param {LoginUserDTO} dto
   */
  async LoginUser(dto) {
    const [json, err] = await AuthAPI.LoginUser(dto);
    if (err) {
      console.log(err, json);
      EventBus.emit(EventBusChannels.Auth, AuthEvents.LoginFailure);
    } else {
      EventBus.emit(EventBusChannels.Auth, AuthEvents.LoginSuccess);
    }
  },
};
