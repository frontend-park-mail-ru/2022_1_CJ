/**
 *
 * @param {Object} obj
 */
export const setStyleVisibility = (obj) => {
  obj.style.visibility = 'visible';
};

/**
 *
 * @param {Object} obj
 */
export const unsetStyleVisibility = (obj) => {
  obj.style.visibility = 'hidden';
};

/**
 *
 * @param {Object} obj
 */
export const changeVisibility = (obj) => {
  if (!obj.style.visibility || obj.style.visibility === 'visible') {
    unsetStyleVisibility(obj);
  } else {
    setStyleVisibility(obj);
  }
};

/**
 *
 * @param {Object} obj
 */
export const setStyleDisplayNone = (obj) => {
  obj.style.display = 'none';
};

/**
 *
 * @param {Object} obj
 */
export const setStyleDisplayBlock = (obj) => {
  obj.style.display = 'block';
};

/**
 *
 * @param {Object} obj
 */
export const setStyleDisplayGrid = (obj) => {
  obj.style.display = 'grid';
};

/**
 *
 * @param {Object} obj
 * @param {String} from
 * @param {String} to
 * @example: div, 'block', 'none'
 * div style display will be changed from block to none if it was block
 * otherwise if div style display was already none it will become block
 */
export const changeDisplay = (obj, from, to = 'none') => {
  const displayStyles = {
    block: setStyleDisplayBlock,
    grid: setStyleDisplayGrid,
    none: setStyleDisplayNone
  };
  if (!obj.style.display || obj.style.display != from) {
    displayStyles[from](obj);
  } else {
    displayStyles[to](obj);
  }
};

/**
 *
 * @param {Event} e
 */
export const checkTextOverflow = (e) => {
  if (e.offsetHeight < e.scrollHeight) {
    let moreTextLink = e.nextElementSibling;
    moreTextLink.style.display = 'block';
  }
};
