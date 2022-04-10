import { URL } from '../../core/constants/constants.js';
import { createComponent } from '../../core/models/Component/Component.js';
import { Router } from '../../core/modules/Router/Router.js';
import { userAPI } from '../../core/network/api/user.js';

const updatePhoto = (e) => {
  let photo = e.target.files[0];
  let formData = new FormData();
  formData.append('photo', photo);
  userAPI.updatePhoto(formData).then(() => Router.navigateTo(URL.ProfileSettings));
};

const reducer = {
  onShow: () => {
    const fileInput = document.getElementById('update-photo');
    fileInput.addEventListener('change', updatePhoto);
  }
};

export const profileSettingsComponent = (template) => createComponent(template, reducer);
