/**
 * @param {String} type
 * @param {Object} payload
 * @returns {Object}
 */
export const createAction = (type, payload = {}) => {
  return { type, payload };
};

export const createReaction = (type, listener) => {
  return { type, listener };
};
