import { createComponent } from '../../core/models/Component/Component.js';
import { Router } from '../../core/modules/Router/Router.js';
import { userAPI } from '../../core/network/api/user.js';

/**
 * 
 * @param {Event} e 
 */
const updatePhoto = (e) => {
  let photo = e.target.files[0];
  let imageField = document.querySelector('.user-image');
  imageField.src = window.URL.createObjectURL(photo);

  // let formData = new FormData();
  // formData.append('photo', photo);
  // userAPI.updatePhoto(formData).then(() => Router.refresh());
};


/**
 * 
 * @param {Event} e 
 */
const uploadNewUserInfo = (e) => {

}

const reducer = {
  onShow: () => {
    const fileInput = document.getElementById('update-photo');
    fileInput.addEventListener('change', updatePhoto);

    const uploadAllProfileChanges = document.getElementById('upload-new-user-info');
    uploadAllProfileChanges.addEventListener('click', uploadNewUserInfo);
  }
};

export const profileSettingsComponent = (template) => createComponent(template, reducer);
