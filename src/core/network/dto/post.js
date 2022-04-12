/**
 *
 * @param {string} message
 * @param {Array.<string>} images
 * @returns
 */
export const createPostDTO = (message, images) => {
  return {
    message,
    images
  };
};

/**
 *
 * @param {*} post_id
 * @returns
 */
export const getPostDTO = (post_id) => {
  return {
    post_id
  };
};

/**
 *
 * @param {*} post_id
 * @param {string} message
 * @param {Array.<string>} images
 * @returns
 */
export const editPostDTO = (post_id, message = null, images = null) => {
  return {
    post_id,
    message,
    images
  };
};
/**
 *
 * @param {*} post_id
 * @returns
 */
export const deletePostDTO = (post_id) => {
  return {
    post_id
  };
};
