import { alertLevels, showAlert } from './alerts.js';

export const handleError = ({ message }) => {
  showAlert(message, alertLevels.error);
};
