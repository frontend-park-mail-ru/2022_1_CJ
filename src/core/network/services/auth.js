import { AuthAPI } from '../api/auth.js';
import { CallbackBus, FallbackBus, Events } from '../../modules/EventBus.js';

export const AuthService = {
  /**
   * @param {SignupUserDTO} dto
   */
  async SignupUser(dto) {
    AuthAPI.SignupUser(dto)
      .then((json) => {
        CallbackBus.emit(Events.AuthSignup, json);
      })
      .catch((err) => {
        FallbackBus.emit(Events.AuthSignup, err);
      });
  },

  /**
   * @param {LoginUserDTO} dto
   */
  async LoginUser(dto) {
    AuthAPI.LoginUser(dto)
      .then((json) => {
        CallbackBus.emit(Events.AuthLogin, json);
      })
      .catch((err) => {
        FallbackBus.emit(Events.AuthLogin, err);
      });
  },
};
