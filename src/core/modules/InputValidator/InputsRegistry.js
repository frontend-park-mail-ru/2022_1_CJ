import { ValidateEmail, ValidatePassword, ValidatePasswordConfirmation, ValidateRequired } from './InputValidator.js';

export const InputNames = {
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
 */
export class InputsRegistry {
  /** @member {Map<String, Object>} inputs */
  #inputs;

  constructor() {
    this.#inputs = new Map();
  }

  /**
   * @param {String} name
   * @param {HTMLInputElement} input
   * @param {String} type
   */
  registerInput(name, type) {
    const input = document.getElementById(name);
    this.#inputs.set(name, { input, type });
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
        ValidatePassword(input);
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
   * @param {String} name
   * @returns {HTMLInputElement}
   */
  get(name) {
    return this.#inputs.get(name).input;
  }

  /**
   * @param {String} name
   * @returns {String}
   */
  value(name) {
    return this.#inputs.get(name).input.value;
  }

  /**
   * @returns {Boolean}
   */
  checkAll() {
    // Mimick input so to trigger event listeners.
    this.#inputs.forEach(({ input }) => {
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    for (const { input, type } of this.#inputs.values()) {
      if (type !== InputTypes.Optional && !input.classList.contains('ok')) {
        return false;
      }
    }
    return true;
  }
}
