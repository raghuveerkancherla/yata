
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

export const addContentItem = (text, currentPage) => {
  return {
    type: 'ADD_TODO',
    text,
    currentPage
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
