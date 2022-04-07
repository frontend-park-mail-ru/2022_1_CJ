import { createComponent } from '../../core/models/Component/Component.js';
import { unsetStyleVisibility } from '../../test/baseFunction.js';


const reducer = {
  onShow: () => {
    let imagesContainer = document.getElementById('image-scroll-container');
    console.log(imagesContainer);
    console.log(imagesContainer.style.visibility);
    if (!imagesContainer.style.visibility || imagesContainer.style.visibility == 'visible') {
      console.log(imagesContainer.style.visibility);
      let imagesWindow = document.querySelector('.image-scroll-window');

      document.addEventListener('click', (e) => {
      const withinBoundaries = e.composedPath().includes(imagesWindow);
      const currBoundaries = e.composedPath().includes();
      console.log(e.currentTarget);
      console.log(imagesWindow);
      console.log(withinBoundaries);
      if (!withinBoundaries) {
        unsetStyleVisibility(imagesContainer);
      }
      });

      document.addEventListener('keydown', function (e) {
      if (e.key == "Escape") {
        unsetStyleVisibility(imagesContainer);
      }
      });
    }
  }
};

export const imageHorizontalScrollComponent = (template) => createComponent(template, reducer);
