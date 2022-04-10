import { CodedError } from '../constants/errors.js';
import { alertLevels, showAlert } from './alerts.js';

/**
 *
 * @param {Error} err
 */
export const handleError = (err) => {
  if (err instanceof CodedError) {
    showAlert(err.message, alertLevels.error);
  }
};
