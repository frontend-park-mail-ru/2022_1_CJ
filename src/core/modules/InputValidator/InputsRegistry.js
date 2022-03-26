// TODO: think of serialization of html forms

import { ValidateEmail, ValidatePasswordConfirmation, ValidateRequired } from './InputValidator.js';

export const InputIDs = {
  FirstName: 'firstname',
  LastName: 'lastname',
  Email: 'email',
  Password: 'password',
  PasswordConfirmation: 'password-confirmation'
};

export const InputTypes = {
  Optional: 'optional',
  Required: 'required',
  Email: 'email',
  Password: 'password',
  PasswordConfirmation: 'password-confirmation'
};

/**
 * InputsRegistry is a wrapper for storing and validating HTML Input Elements.
 * Contract: inputs are wrapped with a span tag to which error messages are appended.
 */
export class InputsRegistry {
  /** @member {Map<String, Object>} inputs */
  #inputs;

  constructor() {
    this.#inputs = new Map();
  }

  /**
   * @param {String} id
   * @param {String} type
   */
  registerInput(id, type) {
    const input = document.getElementById(id);
    this.#inputs.set(id, { input, type });
    // TODO: maybe get rid of switch
    switch (type) {
      case InputTypes.Optional:
        break;
      case InputTypes.Required:
        ValidateRequired(input);
        break;
      case InputTypes.Email:
        ValidateEmail(input);
        break;
      case InputTypes.Password:
        ValidateRequired(input);
        // ValidatePassword(input); FIXME: required is used only for dev mode
        break;
      case InputTypes.PasswordConfirmation:
        if (!this.#inputs.has(InputTypes.Password)) {
          throw new Error('password-confirmation is set before password input');
        }
        ValidatePasswordConfirmation(this.get(InputTypes.Password), input);
        break;
      default:
        throw new Error('unexpected input type');
    }
  }

  /**
   * @param {String} id
   * @returns {HTMLInputElement}
   */
  get(id) {
    return this.#inputs.get(id).input;
  }

  /**
   * @param {String} id
   * @returns {String}
   */
  value(id) {
    return this.#inputs.get(id).input.value;
  }

  /**
   * @returns {Boolean}
   */
  checkAll() {
    // Mimick input to trigger event listeners.
    this.#inputs.forEach(({ input }) => {
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    for (const { input, type } of this.#inputs.values()) {
      // TODO: hardcoded 'valid' is a bad sign
      if (type !== InputTypes.Optional && !input.classList.contains('valid')) {
        return false;
      }
    }
    return true;
  }
}
