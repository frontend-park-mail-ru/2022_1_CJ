import { createView } from '../../core/models/View/View.js';
import { postAPI } from '../../core/network/api/post.js';
import { createPostDTO } from '../../core/network/dto/post.js';
import { store, thunks } from '../../store/store.js';
import { setStyleDisplayGrid } from '../../test/baseFunction.js';

/**
 * 
 * @param {Event} e
 */
const showAddPostElement = (e) => {
    let profileCreatePost = document.querySelector('.profile-create-post');
    setStyleDisplayGrid(profileCreatePost);
}

/**
 * 
 * @param {Event} e 
 */
const uploadNewPost = (e) => {
    let newPost = document.querySelector('.profile-create-post');
    let text = newPost.querySelector('.textarea');
    let postImages = newPost.querySelectorAll('.profile-create-post-images img');
    let images = []; 
    postImages.forEach((element) => {
        images.push(element.src);
    }) 

    store.dispatch(
        postAPI.createPost( 
            createPostDTO(
                text.innerHTML,
                images,
            )
        )
    );
}

const reducer = {
    onShow: () => {
        let postAdd = document.querySelector('.post-add');
        postAdd.addEventListener("click", showAddPostElement);

        let newPost = document.querySelector('.profile-create-post');
        let uploadNewPostBtn = newPost.querySelector('.block.btn-primary');
        uploadNewPostBtn.addEventListener("click", uploadNewPost);
    }
  };

export const profileView = (template) => createView(template, reducer);
