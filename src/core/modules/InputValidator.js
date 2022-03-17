const regexps = {
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
}

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
  input.classList.remove('error');
  input.classList.add('ok');
  if (input.nextElementSibling) {
    input.nextElementSibling.remove();
  }
};

/**
 * @param {HTMLInputElement} input 
 * @param {String} message
 */
const deny = (input, message) => {
  input.classList.remove('ok');
  input.classList.add('error');
  if (!input.nextElementSibling) {
    input.insertAdjacentElement('afterend', createErrorHelper(message));
  }
}

/**
 * @param {HTMLInputElement} input
 */
 export const ValidateRequired = (input) => {
  input.oninput = (_) => {
    if (input.value.trim().length === 0) {
      deny(input, 'cannot be blank');
    } else {
      approve(input);
    }
  }
}

/**
 * @param {HTMLInputElement} input
 */
 export const ValidateEmail = (input) => {
  input.oninput = (_) => {
    if (regexps.email.test(input.value)) {
      approve(input);
    } else {
      deny(input, 'invalid email address');
    }
  }
}

/**
 * @param {HTMLInputElement} input
 */
export const ValidatePassword = (input) => {
  input.oninput = (_) => {
    if (regexps.password.test(input.value)) {
      approve(input);
    } else {
      deny(input, 'invalid password');
    }
  }
}

/**
 * @param {HTMLInputElement} password 
 * @param {HTMLInputElement} passwordConfirmation 
 */
export const ValidatePasswordConfirmation = (password, passwordConfirmation) => {
  passwordConfirmation.oninput = (_) => {
    if (passwordConfirmation.value !== password.value) {
      deny(passwordConfirmation, 'passwords mismatch');
    } else {
      approve(passwordConfirmation);
    }
  }
}

/**
 * @param {HTMLInputElement} input
 */
export const Validate = (input) => {
  input.dispatchEvent(new Event('input', { bubbles: true }));
  return input.classList.contains('ok');
}
