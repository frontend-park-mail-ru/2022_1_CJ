import { createComponent } from '../../core/models/Component/Component.js';
import { unsetStyleVisibility } from '../../test/baseFunction.js';

const reducer = {
    onShow: () => {
        let modalRepliesContainer = document.getElementById('reply-container');

        if (!modalRepliesContainer.style.visibility || modalRepliesContainer.style.visibility == 'visible') {
            let modalRepliesWindow = document.querySelector('.reply-section');

            document.addEventListener('click', (e) => {
                const withinBoundaries = e.composedPath().includes(modalRepliesWindow);
                let dopBoundaries;
                const correctTarget = e.target.classList.contains('repost') || e.target.parentElement.classList.contains('repost');
                
                if (correctTarget) {
                  dopBoundaries = e.composedPath().includes(e.target);
                  return;
                }
                if (!withinBoundaries && !dopBoundaries) {
                  unsetStyleVisibility(modalRepliesContainer);
                }
            });
        
            document.addEventListener('keydown', function (e) {
                if (e.key == "Escape") {
                    unsetStyleVisibility(modalRepliesContainer);
                }
            });
        }
    }
};

export const modalRepliesComponent = (template) => createComponent(template, reducer);
