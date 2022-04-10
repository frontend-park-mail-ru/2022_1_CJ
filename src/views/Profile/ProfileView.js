import { createView } from '../../core/models/View/View.js';

const reducer = {
    onShow: () => {
        console.log("BARABARA");
    }
  };

export const profileView = (template) => createView(template, reducer);
