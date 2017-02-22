
export const changeCurrentPage = (pageKey, pageType) => {
  return {
    type: 'CHANGE_PAGE',
    pageKey: pageKey,
    pageType: pageType
  };
};

export const addNewPage = (pageName) => {
  return {
    type: 'ADD_PAGE',
    pageName: pageName,
    pageType: 'custom'
  };
};

export const addContentItem = (text, currentPage, afterObjId) => {
  return {
    type: 'ADD_TODO',
    text,
    currentPage,
    afterObjId
  };
};

export const removeContentItem = (id) => {
  return {
    type: 'REMOVE_TODO',
    id
  };
};

export const editContentItem = (id, text) => {
  return {
    type: 'EDIT_TODO',
    id,
    text
  };
};

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  };
};

export const toggleContentItem = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  };
};
