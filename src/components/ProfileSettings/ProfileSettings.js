import { createComponent } from '../../core/models/Component/Component.js';
import { Router } from '../../core/modules/Router/Router.js';
import { userAPI } from '../../core/network/api/user.js';

/**
 *
 * @param {Event} e
 */
const updatePhoto = () => {
  let photo = document.getElementById('update-photo').files[0];
  let formData = new FormData();
  formData.append('photo', photo);
  userAPI.updatePhoto(formData).then(() => Router.refresh());
};

/**
 *
 * @param {Event} e
 */
const uploadNewUserInfo = (e) => {
  updatePhoto();
};

const reducer = {
  onShow: () => {
    const uploadAllProfileChanges = document.getElementById('upload-new-user-info');
    uploadAllProfileChanges.addEventListener('click', uploadNewUserInfo);
  }
};

export const profileSettingsComponent = (template) => createComponent(template, reducer);
