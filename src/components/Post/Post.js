import { createComponent } from '../../core/models/Component/Component.js';

/**
 * 
 * @param {Event} e 
 */
const changeLike = (e) => {
    function simplify(value,  numCount) {
        switch (true) {
        case numCount % 3 === 0:
            return Math.round(value / 10**(numCount - 6));
        case numCount % 3 === 1:
            return Math.round(value / 10**(numCount - 4));            
        case numCount % 3 === 2:
            return Math.round(value / 10**(numCount - 5));
        }
    }
      
    function convertor(val) {
        let numCount = String(val).length;
        if (numCount < 4) {
            return String(val);
        }
        
        val = simplify(val, numCount);
        let len = String(val).length;
        val = Math.round(val / 10**(len - 3)) / 10**(6 - len);
        
        switch (true) {
        case 6 < numCount:
            return val + 'm';
        case 4 <= numCount && numCount <= 6:
            return val + 'k';
        }
    }

    const likeImg = e.currentTarget.firstElementChild;    // get like Object
    const likesField = e.currentTarget.lastElementChild;  // get likes field Object
    let likesCount = +likesField.innerHTML;
    const image = likeImg.src.split('/').pop();           // get like.jpg
    let [imageName, extension] = image.split('.');        // get imageName = like, extension = jpg

    if (imageName.endsWith('_pressed')) {
        likeImg.src = likeImg.src.replace(`_pressed\.${extension}`, `\.${extension}`); 
        likesCount -= 1;
    } else {
        likeImg.src = likeImg.src.replace(`\.${extension}`, `_pressed\.${extension}`); 
        likesCount += 1;
    }
    let likesStr = convertor(likesCount);
    console.log(likesStr);
    likesField.innerHTML= likesStr;                       // likesField get new number
    // TODO: send new likes count to backend
}
/**
 * 
 * @param {Event} e
 */
const getComments = (e) => {

    /**
     * 
     * @param {Object} obj 
     */
    function hideElement(obj) {
        obj.style.display = 'none'
    }

    /**
     * 
     * @param {Object} obj 
     */
    function showElement(obj) {
        obj.style.display = 'block'
    }

    const comments = e.currentTarget.parentElement.nextElementSibling;
    console.log(comments.style.display);
    if (!comments.style.display || comments.style.display === 'none') {
        showElement(comments);
        // comments.style.display = 'none';
    } else {
        hideElement(comments);
        // comments.style.display = 'block';
    }
    // TODO: asking back for first 25 comments
    // create such elements and add them to comments section
    console.log(e.currentTarget);
}

/**
 * 
 * @param {Event} e 
 */
const openReposts = (e) => {
    const reply = e.currentTarget.parentElement.previousElementSibling;
    console.log(reply);
    console.log(reply.parentElement);
    console.log(reply.parentElement.parentElement);
    if (!reply.style.display || reply.style.display === 'none') {
        // showElement(comments);
        reply.style.display = 'grid';
    } else {
        // hideElement(comments);
        reply.style.display = 'none';
    }
    // TODO: asking back for all user friends and group ids
    // add first 15 to reply section
    // we also need to make search probably, but 
    // this will mean that we will ask back for all ids at once
    console.log(e.currentTarget);
}

const reducer = {
    onShow: () => {
        // const post = document.getElementById(post.id)
        const currPost = document.querySelectorAll('.post')[0];
        // console.log(currPost);
        const reactions = currPost.querySelectorAll('.reactions .btn-like');
        // console.log(reactions);
        const [ like, comment, repost ] = reactions;
        console.log(like, comment, repost);
        like.addEventListener('click', changeLike);
        comment.addEventListener('click', getComments);
        repost.addEventListener('click', openReposts);
    }
};

export const postComponent = (template) => createComponent(template, reducer);
