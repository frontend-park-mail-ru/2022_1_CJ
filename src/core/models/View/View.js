import { createComponent } from '../Component/Component.js';

// export class View extends Component {
//   /** @member {Function[]} adapters - functions to be called before rendering to obtain a context. */
//   #adapters;

//   /**
//    * @constructor
//    * @param {Function} template - function for generating the HTML.
//    * @param  {...Function} adapters
//    */
//   constructor(template, ...adapters) {
//     super(template);
//     this.#adapters = adapters;
//   }

//   /**
//    * Set document's title.
//    * @param {String} title
//    */
//   setTitle(title) {
//     document.title = title;
//   }

//   /**
//    * Call adapters, super render method and add event listeners.
//    * @param {HTMLElement} parent - parent HTML Element for output.
//    */
//   render(parent) {
//     // Call all the adapters and efficiently wait for them to finish.
//     // Note: Promise.allSettled is used so that some adapters may fail,
//     // and the failure is supposed to be detected in check state function.
//     Promise.allSettled(this.#adapters.map((adapter) => adapter(this))).then(() => {
//       parent.innerHTML = super.render();
//       this.onShow();
//     });
//   }
// }

export const createView = (template, ...adapters) => {
  const view = createComponent(template);

  view.show = (parent) => {
    Promise.allSettled(adapters.map((adapter) => adapter(view))).then(() => {
      parent.innerHTML = view.render();
      view.onShow();
    });
  };

  return view;
};
