import { createComponent } from '../../core/models/Component/Component.js';
import { setStyleDisplayNone, unsetStyleVisibility } from '../../test/baseFunction.js';


const reducer = {
  onShow: () => {
    let imagesContainer = document.getElementById('image-scroll-container');

    if (!imagesContainer.style.visibility || imagesContainer.style.visibility == 'visible') {
      let imagesWindow = document.querySelector('.image-scroll-window');

      document.addEventListener('click', (e) => {
        const withinBoundaries = e.composedPath().includes(imagesWindow);
        let dopBoundaries;
        const correctTarget = e.target.className == "content-part";

        if (correctTarget) {
          dopBoundaries = e.composedPath().includes(e.target);
          return;
        }
        if (!withinBoundaries && !dopBoundaries) {
          setStyleDisplayNone(imagesContainer);
        }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key == "Escape") {
          setStyleDisplayNone(imagesContainer);
        }
      });
    }
  }
};

export const imageHorizontalScrollComponent = (template) => createComponent(template, reducer);
