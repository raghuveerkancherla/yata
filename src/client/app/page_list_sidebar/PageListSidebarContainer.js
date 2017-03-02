import { connect } from 'react-redux';
import { changeCurrentPage, addNewPage, changePageSwitcherVisibility } from '../actions';
import PageListSidebarComponent from './PageListSideBarComponent';

const mapStateToProps = (state) => {
  return {
    currentPage: state.currentPage,
    customPages: state.customPages
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPageChange: (pageKey, pageType, pageContext) => {
      dispatch(changeCurrentPage(pageKey, pageType));
    },
    onAddPage: (pageName) => {
      dispatch(addNewPage(pageName));
      // add a new page and then switch to it
      dispatch(changeCurrentPage(pageName, 'custom'));
    },
    onShowPageSwitcher: () => {
      dispatch(changePageSwitcherVisibility(true));
    }

  };
};

const PageListSidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageListSidebarComponent);

export default PageListSidebarContainer;
