
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

export const addContentItem = (text, currentPage, status, afterObjId) => {
  return {
    type: 'ADD_TODO',
    text,
    currentPage,
    status,
    afterObjId
  };
};

export const removeContentItem = (id, idToFocusNext) => {
  return {
    type: 'REMOVE_TODO',
    id,
    idToFocusNext
  };
};

export const editContentItem = (id, text, isFocused) => {
  return {
    type: 'EDIT_TODO',
    id,
    text,
    isFocused
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

export const changePageSwitcherVisibility = (status) => {
  return {
    type: 'CHANGE_PAGE_SWITCHER_VISIBILITY',
    status: status
  };
};