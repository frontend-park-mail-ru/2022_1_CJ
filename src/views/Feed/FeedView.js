import View from '../../core/models/View.js';
import { TemplatesRegistry } from '../../core/constants/templates_registry.js';

export class FeedView extends View {
  constructor() {
    super(null, TemplatesRegistry.Feed);
    this.setTitle('Feed');
  }

  addEventListeners() {
    super.addEventListeners();

    // user profile settingsf
    document.getElementById('profile').onclick = this.redirect;

    // main menu buttons
    var elements = document.querySelectorAll("#main-menu .element");
    for (var i = 0; i < elements.length; i++) {
      elements[i].onclick = this.redirect;
    }

    // post author -> redirect to author profile
    // post settings -> open window with settings
    var elements = document.querySelectorAll(".post .author");
    for (var i = 0; i < elements.length; i++) {
      elements[i].onclick = this.redirect;
    }
    var elements = document.querySelectorAll(".post .settings");
    for (var i = 0; i < elements.length; i++) {
      elements[i].onclick = this.postSettingsOnClick;
    }

    // like -> +1 to likes count, animation [-1 from dislikes (if dislike was="on"), animation]
    // comment -> open comment section with ability to type and see previous comments
    // repost -> open [friends, your groups, profile] icons where you can send this post
    // dislike -> +1 to dislikes count, animation [-1 from likes (if like was="on"), animation]
    var elements = document.querySelectorAll(".like-reaction");
    for (var i = 0; i < elements.length; i++) {
      elements[i].onclick = this.likeReaction;
    }
    var elements = document.querySelectorAll(".comment-reaction");
    for (var i = 0; i < elements.length; i++) {
      elements[i].onclick = this.commentReaction;
    }
    var elements = document.querySelectorAll(".repost-reaction");
    for (var i = 0; i < elements.length; i++) {
      elements[i].onclick = this.repostReaction;
    }
    var elements = document.querySelectorAll(".dislike-reaction");
    for (var i = 0; i < elements.length; i++) {
      elements[i].onclick = this.likeReaction;
    }
  }

  /**
   * 
   * @param {Event} e 
   */
  postSettingsOnClick(e) {
    e.currentTarget.parentNode.innerHTML += TemplatesRegistry.PostSettings();
    // if (e.currentTarget.hidden)
    //   e.currentTarget.firstElementChild.hidden = false;
    // else {
    //   e.currentTarget.firstElementChild.hidden = true;
    // }
  }

  postSettings(e) {
    div = createDivContainer();
  }

  // for main menu buttons ['redirection' to another page]
  redirect(e) {
    console.log(e + 'was pressed');
  }

  /**
   * 
   * @param {Event} e 
   */
  likeReaction(e) {

    /**
     * 
     * @param {Object} obj
     */
    function resetReaction(obj) {
      let image = obj.firstElementChild;
      let raiting = obj.lastElementChild;
      let raitingInt = +raiting.innerHTML;

      if (image.src.endsWith('_b.png')) {
        image.src = image.src.replace(/_b.png$/, '.png');
        raiting.innerHTML = (raitingInt - 1).toString();
      }
    }

    const react = ['like', 'dislike'];

    let fullImageName = e.currentTarget.firstElementChild.src.split('/').pop();
    let [imageName, extension] = fullImageName.split('.');

    let image = e.currentTarget.firstElementChild;
    let raiting = e.currentTarget.lastElementChild;
    let raitingInt = +raiting.innerHTML;

    if (react.includes(imageName)) {
      image.src = image.src.replace(/.png$/, '_b.png');
      raiting.innerHTML = (raitingInt + 1).toString();

      let otherReactionName = `.${react[+(imageName == 'like')]}-reaction`;
      resetReaction(document.querySelector(otherReactionName));
    } else {
      resetReaction(e.currentTarget);
    }
    // send info to back
  }

  /**
   * 
   * @param {Event} e 
   */
  commentReaction(e) {
    let comments = e.currentTarget.parentNode.parentNode.nextElementSibling;

    if (!comments.style.display || comments.style.display == 'none') {
      comments.style.display = 'block';
    } else {
      comments.style.display = "none";
    }
  }

  /**
   * 
   * @param {Event} e 
   */
  repostReaction(e) {
    console.log(e.currentTarget.parentNode);
  }

}
