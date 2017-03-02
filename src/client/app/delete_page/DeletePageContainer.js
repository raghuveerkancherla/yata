import { connect } from 'react-redux';
import DeletePageComponent from './DeletePageComponent';
import {deletePage, changeCurrentPage} from '../actions';
import dateUtils from '../utils/dateUtils';
import _ from 'lodash';


const mapStateToProps = (state) => {
  var currPageKey = state.currentPage.page;
  var pageContents = _.filter(state.contentItems, (item) => {
    return _.indexOf(item.pages, currPageKey) > -1 && item.text && item.text.length > 0;
  });

  return {
    currentPage: state.currentPage,
    numTodosCurrentPage: pageContents.length,
    customPages: state.customPages
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeletePage: (pageKey, nextPageKey, nextPageType) => {
      dispatch(deletePage(pageKey));
      dispatch(changeCurrentPage(nextPageKey, nextPageType));
    }
  };
};

const DeletePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeletePageComponent);

export default DeletePageContainer;
