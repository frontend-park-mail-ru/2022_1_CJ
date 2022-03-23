// TODO: make a generic validation function

const regexps = {
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  // password: 8 to 15 characters, mixed cases, at least one digit and special character
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
};

const inputStates = {
  valid: 'valid',
  invalid: 'invalid'
};

const errorMessages = {
  required: 'cannot be blank',
  email: 'invalid email address',
  password: 'invalid password',
  passwordConfirmation: 'passwords mismatch'
};

/**
 * @param {String} message
 * @returns {HTMLElement}
 */
const createErrorHelper = (message) => {
  const helper = document.createElement('div');
  helper.innerText = message;
  helper.classList.add('helper', 'helper-error');
  return helper;
};

/**
 * @param {HTMLInputElement} input
 */
const approve = (input) => {
  input.classList.remove(inputStates.invalid);
  input.classList.add(inputStates.valid);
  // Next sibling element is supposed to be an error message in the input's span.
  if (input.nextElementSibling) {
    input.nextElementSibling.remove();
  }
};

/**
 * @param {HTMLInputElement} input
 * @param {String} message
 */
const deny = (input, message) => {
  input.classList.remove(inputStates.valid);
  input.classList.add(inputStates.invalid);
  // Next sibling element is supposed to be an error message in the input's span.
  if (!input.nextElementSibling) {
    input.insertAdjacentElement('afterend', createErrorHelper(message));
  }
};

/**
 * @param {HTMLInputElement} input
 */
export const ValidateRequired = (input) => {
  input.addEventListener('input', () => {
    if (input.value.trim().length === 0) {
      deny(input, errorMessages.required);
    } else {
      approve(input);
    }
  });
};

/**
 * @param {HTMLInputElement} input
 */
export const ValidateEmail = (input) => {
  input.addEventListener('input', () => {
    if (regexps.email.test(input.value)) {
      approve(input);
    } else {
      deny(input, errorMessages.email);
    }
  });
};

/**
 * @param {HTMLInputElement} input
 */
export const ValidatePassword = (input) => {
  input.addEventListener('input', () => {
    if (regexps.password.test(input.value)) {
      approve(input);
    } else {
      deny(input, errorMessages.password);
    }
  });
};

/**
 * @param {HTMLInputElement} password
 * @param {HTMLInputElement} passwordConfirmation
 */
export const ValidatePasswordConfirmation = (password, passwordConfirmation) => {
  passwordConfirmation.addEventListener('input', () => {
    if (passwordConfirmation.value.trim().length === 0) {
      deny(passwordConfirmation, errorMessages.required);
    } else if (passwordConfirmation.value !== password.value) {
      deny(passwordConfirmation, errorMessages.passwordConfirmation);
    } else {
      approve(passwordConfirmation);
    }
  });
};

/**
 * @param {HTMLInputElement} input
 */
export const Validate = (input) => {
  input.dispatchEvent(new Event('input', { bubbles: true }));
  return input.classList.contains(inputStates.valid);
};
