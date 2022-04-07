import { createComponent } from '../../core/models/Component/Component.js';

const reducer = {
    onShow: () => {
        let modalRepliesContainer = document.querySelector('.reply-container');
        if (modalRepliesContainer.style.visibility == 'visible') {
            let modalRepliesWindow = document.querySelector('.reply-section');
    
            document.addEventListener('click', (e) => {
                const withinBoundaries = e.composedPath().includes(modalRepliesWindow);
                if (!withinBoundaries) {
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
