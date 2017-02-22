

import { connect } from 'react-redux';
import _ from 'lodash';
import { toggleContentItem, addContentItem, editContentItem, removeContentItem  } from '../actions';
import ContentItemList from './ContentItemList';

const getVisibleContentItems = (contentItems, filter, currentPage) => {
  var pageContents = _.filter(contentItems,
    (item) => {return _.indexOf(item.pages, currentPage) > -1;});

  switch (filter) {
    case 'SHOW_ALL':
      return pageContents;
    case 'SHOW_COMPLETED':
      return pageContents.filter(item => item.completed);
    case 'SHOW_ACTIVE':
      return pageContents.filter(item => !item.completed);
  }
};

const mapStateToProps = (state) => {
  return {
    contentItems: getVisibleContentItems(state.contentItems,
      state.visibilityFilter, state.currentPage.page),
    currentPage: state.currentPage.page
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onContentItemToggle: (id) => {
      dispatch(toggleContentItem(id));
    },
    onAddContentItem: (text, currentPage, afterObjId) => {
      dispatch(addContentItem(text, currentPage, afterObjId));
    },
    onRemoveContentItem: (id) => {
      dispatch(removeContentItem(id));
    },
    saveContentofItem: (id, text) => {
      dispatch(editContentItem(id, text) );
    }
  };
};

const VisibleContentItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentItemList);

export default VisibleContentItemContainer;