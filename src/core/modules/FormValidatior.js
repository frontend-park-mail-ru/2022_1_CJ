/**
 * @param {String} message 
 * @returns {HTMLElement}
 */
const createErrorHelper = (message) => {
  const helper = document.createElement('div');
  helper.innerText = message;
  helper.classList.add('helper', 'helper-error');
  return helper;
}

/**
 * @param {HTMLInputElement} input
 * @param {String} message
 * @param {String} status
 */
const setStatus = (input, message, status) => {
  if (status === 'ok') {
    input.classList.remove('error');
    input.classList.add('ok');
    if (input.nextElementSibling) {
      input.nextElementSibling.remove();
    }
  } else if (status === 'error') {
    input.classList.remove('ok');
    input.classList.add('error');
    if (!input.nextElementSibling) {
      input.insertAdjacentElement('afterend', createErrorHelper(message));
    }
  }
}

/**
 * @param {HTMLInputElement} input
 */
export const ValidateInput = (input) => {
  // TODO: check for 'required' option
  if (input.value.trim().length === 0) {
    setStatus(input, 'cannot be blank', 'error')
  } else {
    setStatus(input, null, 'ok')
  }

  // check for a valid email address
  if (input.type === 'email') {
    const re = /\S+@\S+\.\S+/
    if (re.test(input.value)) {
      setStatus(input, null, 'ok')
    } else {
      setStatus(input, 'invalid email address', 'error')
    }
  }

  // Password confirmation edge case
  if (input.id === 'password-confirmation') {
    // TODO: make it more safe
    const passwordinput = document.getElementById('password');
    if (input.value.trim() == '') {
      setStatus(input, 'Password confirmation required', 'error')
    } else if (input.value !== passwordinput.value) {
      setStatus(input, 'Passwords mismatch', 'error')
    } else {
      setStatus(input, null, 'ok')
    }
  }

  if (input.id === 'password') {
    // let's believe it works as expected: https://www.w3resource.com/javascript/form/password-validation.php
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (re.test(input.value)) {
      setStatus(input, null, 'ok')
    } else {
      setStatus(input, 'Invalid password', 'error')
    }
  }
}

// TODO: refactor
/**
 * @param {HTMLInputElement} input
 */
export const ValidateOnInput = (input) => {
  input.oninput = (e) => {
    if (input.id === 'password') {
      ValidateInput(document.getElementById('password-confirmation'));
    }
    ValidateInput(input);
  };
}
