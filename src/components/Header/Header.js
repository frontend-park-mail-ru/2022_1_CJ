import { createComponent } from '../../core/models/Component/Component.js';

/**
 * 
 * @param {Event} e 
 */
const showSettings = (e) => {
    /**
     *
     * @param {Object} obj
     */
    function hideElement(obj) {
        obj.style.display = 'none';
    }

    /**
     *
     * @param {Object} obj
     */
    function showElement(obj) {
        obj.style.display = 'block';
    }

    let profileMenu = e.currentTarget.nextElementSibling;

    if (!profileMenu.style.display || profileMenu.style.display === 'none') {
        showElement(profileMenu);
        // profileMenu.style.display = 'none';
    } else {
        hideElement(profileMenu);
        // profileMenu.style.display = 'block';
    }
    // TODO: close on click to any outside area
    console.log(e.currentTarget);
}

const reducer = {
    onShow: () => {
        console.log('HYYYYYYYYYY');
        const profile = document.querySelector('.profile');
        profile.addEventListener('click', showSettings);
    }
};

export const headerComponent = (template) => createComponent(template, reducer);
