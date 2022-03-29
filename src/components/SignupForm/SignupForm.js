import { URL } from '../../core/constants/constants.js';
import { createReaction } from '../../core/models/Action/Action.js';
import { createComponent } from '../../core/models/Component/Component.js';
import { InputIDs, InputsRegistry, InputTypes } from '../../core/modules/InputValidator/InputsRegistry.js';
import { Router } from '../../core/modules/Router/Router.js';
import { SignupUserDTO } from '../../core/network/dto/auth.js';
import { userActions, store, userThunks } from '../../store/store.js';

const inputsRegistry = new InputsRegistry();

const onSubmit = (event) => {
  event.preventDefault();

  if (!inputsRegistry.checkAll()) {
    return;
  }

  store.dispatch(
    userThunks.signup(
      new SignupUserDTO(
        inputsRegistry.value(InputIDs.Email),
        inputsRegistry.value(InputIDs.FirstName),
        inputsRegistry.value(InputIDs.LastName),
        inputsRegistry.value(InputIDs.Password)
      )
    )
  );

  store.oneOf(
    createReaction(userActions.signup.success, () => Router.navigateTo(URL.Feed)),
    createReaction(userActions.signup.failure, ({ payload }) => console.log(payload.err))
  );
};

const reducer = {
  onShow: () => {
    inputsRegistry.registerInput(InputIDs.FirstName, InputTypes.Required);
    inputsRegistry.registerInput(InputIDs.LastName, InputTypes.Required);
    inputsRegistry.registerInput(InputIDs.Email, InputTypes.Email);
    inputsRegistry.registerInput(InputIDs.Password, InputTypes.Password);
    inputsRegistry.registerInput(InputIDs.PasswordConfirmation, InputTypes.PasswordConfirmation);
    document.getElementById('form-signup').addEventListener('submit', onSubmit);
  }
};

export const signupFormComponent = (template) => createComponent(template, reducer);
