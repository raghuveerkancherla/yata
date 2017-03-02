import { connect } from 'react-redux';
import DeletePageComponent from './DeletePageComponent';
import {deletePage, changeCurrentPage} from '../actions';
import dateUtils from '../utils/dateUtils';


const mapStateToProps = (state) => {
  return {
    currentPage: state.currentPage,
    numTodosCurrentPage: 1,
    customPages: state.customPages
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeletePage: (pageKey, nextPageKey) => {
      dispatch(deletePage(pageKey));
      nextPageKey = nextPageKey || dateUtils.getDateKey(dateUtils.getStartOfToday());
      dispatch(changeCurrentPage(nextPageKey, 'custom'));
    }
  };
};

const DeletePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeletePageComponent);

export default DeletePageContainer;
