import { connect } from 'react-redux';
import DeletePageComponent from './DeletePageComponent';
import {deletePage} from '../actions';


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
      dispatch(deletePage(pageKey, nextPageKey));
    }
  };
};

const DeletePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeletePageComponent);

export default DeletePageContainer;
