const alerts = document.querySelector('ul.alerts');

export const alertLevels = {
  error: 'error',
  warning: 'warning',
  info: 'info',
  success: 'success'
};

let timeoutClearAlertsID;

const clearAlerts = () => {
  alerts.style.opacity = 0;
  alerts.style.transition = '1s';
  setTimeout(() => {
    while (alerts.firstChild) {
      alerts.removeChild(alerts.firstChild);
    }
  }, 500);
};

const showPromise = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      alerts.style.opacity = 1;
      resolve();
    }, 10);
  });
};

const showAlerts = () => {
  clearTimeout(timeoutClearAlertsID);
  showPromise().then(
    (timeoutClearAlertsID = setTimeout(() => {
      clearAlerts();
    }, 2000))
  );
};

export const showAlert = (msg, level) => {
  if (alerts.firstChild) {
    showAlerts();
    return;
  }
  // else
  let alert = document.createElement('li');
  alert.className = level;
  alert.innerText = msg;
  alerts.append(alert);
  showAlerts();
};
