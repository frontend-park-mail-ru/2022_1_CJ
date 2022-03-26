import { URL } from '../../core/constants/constants.js';
import { createComponent } from '../../core/models/Component/Component.js';
import { InputIDs, InputsRegistry, InputTypes } from '../../core/modules/InputValidator/InputsRegistry.js';
import { Router } from '../../core/modules/Router/Router.js';
import { LoginUserDTO } from '../../core/network/dto/auth.js';
import { userActions, userStore, userThunks } from '../../stores/UserStore.js';

const inputsRegistry = new InputsRegistry();

const onSubmit = (event) => {
  event.preventDefault();

  if (!inputsRegistry.checkAll()) {
    return;
  }

  userStore.dispatch(
    userThunks.login(new LoginUserDTO(inputsRegistry.value(InputIDs.Email), inputsRegistry.value(InputIDs.Password)))
  );

  userStore.once(({ type, payload }) => {
    switch (type) {
      case userActions.loginSuccess:
        Router.navigateTo(URL.Feed);
        break;
      case userActions.loginFailure:
        console.log(payload.err); // TODO:
        break;
    }
  });
};

const reducer = {
  onShow: () => {
    inputsRegistry.registerInput(InputIDs.Email, InputTypes.Email);
    inputsRegistry.registerInput(InputIDs.Password, InputTypes.Required);
    document.getElementById('form-login').addEventListener('submit', onSubmit);
  }
};

export const loginFormComponent = (template) => createComponent(template, reducer);
