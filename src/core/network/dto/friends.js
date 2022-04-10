export const sendFriendRequestDTO = (message, images) => {
  return {
    message,
    images
  };
};

export const getPostDTO = (post_id) => {
  return {
    post_id
  };
};

export const editPostDTO = (post_id, message = null, images = null) => {
  return {
    post_id,
    message,
    images
  };
};

export const deletePostDTO = (post_id) => {
  return {
    post_id
  };
};
