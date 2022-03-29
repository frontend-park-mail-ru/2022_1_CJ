import { URL } from '../../core/constants/constants.js';
import { createReaction } from '../../core/models/Action/Action.js';
import { createComponent } from '../../core/models/Component/Component.js';
import { InputIDs, InputsRegistry, InputTypes } from '../../core/modules/InputValidator/InputsRegistry.js';
import { Router } from '../../core/modules/Router/Router.js';
import { LoginUserDTO } from '../../core/network/dto/auth.js';
import { actions, store, thunks } from '../../store/store.js';

const inputsRegistry = new InputsRegistry();

const onSubmit = (event) => {
  event.preventDefault();

  if (!inputsRegistry.checkAll()) {
    return;
  }

  store.dispatch(
    thunks.user.login(new LoginUserDTO(inputsRegistry.value(InputIDs.Email), inputsRegistry.value(InputIDs.Password)))
  );

  store.oneOf(
    createReaction(actions.user.login.success, () => Router.navigateTo(URL.Feed)),
    createReaction(actions.user.login.failure, ({ payload }) => console.log(payload.err))
  );
};

const reducer = {
  onShow: () => {
    inputsRegistry.registerInput(InputIDs.Email, InputTypes.Email);
    inputsRegistry.registerInput(InputIDs.Password, InputTypes.Required);
    document.getElementById('form-login').addEventListener('submit', onSubmit);
  }
};

export const loginFormComponent = (template) => createComponent(template, reducer);
