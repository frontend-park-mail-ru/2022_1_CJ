export class PostAuthorDTO {
  /**
     * @param {String} image
     * @param {String} firstname
     * @param {String} lastname
     * @param {String} url
     */
  constructor(image, firstname, lastname, url) {
    this.image = image;
    this.name = { first: firstname, last: lastname };
    this.url = url;
  }
}

export class PostBodyDTO {
  /**
     * @param {String} text
     * @param {Array.<string>} imageUrls
     */
  constructor(text, imageUrls) {
    this.text = text;
    this.images = imageUrls;
  }
}

export class PostReactionsDTO {
  /**
     * @param {Array.<Object>} text
     * @param {Array.<Object>} imageUrls
     */
  constructor(text, imageUrls) {
    this.text = text;
    this.images = imageUrls;
  }
}

export class PostDTO {
  /**
     * @param {int} user_id
     * @param {Object} body
     * @param {Object} likes
     * @param {Object} comments
     * @param {Object} dislikes
     * @param {int} watched
     */
  constructor(user_id, body, likes, comments, dislikes, watched) {
    this.author = user_id;
    this.body = body;
    this.likes = likes;
    this.cooments = comments;
    this.dislikes = dislikes;
    this.watched = watched;
  }
}

// this.body = {
//     text: 'text',
//     images: [
//         {img1: 'url1'},
//         {img2: 'url2'},
//     ]
//   };
// this.reactions = {
//     likes: {
//         count: 5,
//         // images and names of people who liked it
//         // for exapmle 5 or less last users, who liked it
//         users_liked: [
//             {
//                 user1: {
//                     name: {first: firstname, last:lastname},
//                     url: 'url_to_user_profile', // not sure about this one
//                 }
//             },
//             {
//                 user2: {
//                     name: {first: firstname, last:lastname},
//                     url: 'url_to_user_profile', // not sure about this one
//                 }
//             },
//         ]
//     },
//     comments: {
//         count: 6,
//         commentators: [
//             {
//                 user1: {
//                     name: {first: firstname, last:lastname},
//                     url: 'url_to_user_profile',
//                     text: 'text',
//                 }
//             },
//             {
//                 user2: {
//                     name: {first: firstname, last:lastname},
//                     url: 'url_to_user_profile',
//                     text: 'text',
//                 }
//             },
//         ]
//     },
//     dislikes: {
//         count: 6,
//         // same as likes
//     },
//     watched: {
//         count: watched,
//     }
// };
