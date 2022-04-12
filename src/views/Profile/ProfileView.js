import { createView } from '../../core/models/View/View.js';
import { postAPI } from '../../core/network/api/post.js';
import { createPostDTO } from '../../core/network/dto/post.js';
import { store, thunks } from '../../store/store.js';
import { setStyleDisplayGrid, setStyleDisplayNone } from '../../test/baseFunction.js';

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
const uploadContent = (e) => {
    let photos = e.target.files;
    let contentContainer = document.querySelector('.profile-create-post-images');
    for (let i = 0; i < photos.length; i++) {
        let newImage = document.createElement('img');
        // TODO: need to check file extension again
        newImage.src = window.URL.createObjectURL(photos[i]);
        contentContainer.appendChild(newImage);
    }
}

/**
 * 
 * @param {Event} e 
 */
const uploadNewPost = (e) => {
    let newPost = document.querySelector('.profile-create-post');
    let text = "" || newPost.querySelector('.profile-create-post .textarea').textContent;
    let postImages = newPost.querySelectorAll('.profile-create-post-images img');
    let images = []; 
    postImages.forEach((element) => {
        images.push(element.src);
    });

    //TODO: check if information exist

    store.dispatch(
        postAPI.createPost( 
            createPostDTO(
                text,
                images,
            )
        )
    );
    
    setStyleDisplayNone(newPost);
}

const reducer = {
    onShow: () => {
        let postAdd = document.querySelector('.post-add');
        postAdd.addEventListener("click", showAddPostElement);

        let newPost = document.querySelector('.profile-create-post');
        let uploadContentBtn = document.getElementById('upload-post-content');
        uploadContentBtn.addEventListener('change', uploadContent);

        let uploadNewPostBtn = newPost.querySelector('.block.btn-primary');
        uploadNewPostBtn.addEventListener("click", uploadNewPost);
    }
  };

export const profileView = (template) => createView(template, reducer);
