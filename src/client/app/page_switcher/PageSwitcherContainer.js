import { connect } from 'react-redux';
import { changeCurrentPage, addNewPage,
  changePageSwitcherVisibility, changeAnchorDate  } from '../actions';
import PageSwitcherModal from './PageSwitcherModal';

const mapStateToProps = (state) => {
  return {
    customPages: state.customPages,
    pageSwitcher: state.pageSwitcher,
    currentPage: state.currentPage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPageChangeBySearch: (pageKey, pageType) => {
      dispatch(changeCurrentPage(pageKey, pageType));
      if (pageType == 'date') {
        dispatch(changeAnchorDate(pageKey));
      }
    },
    onAddPage: (pageName) => {
      dispatch(addNewPage(pageName));
      // add a new page and then switch to it
      dispatch(changeCurrentPage(pageName, 'custom'));
    },
    onShowPageSwitcher: () => {
      dispatch(changePageSwitcherVisibility(true));
    },
    onHidePageSwitcher: () => {
      dispatch(changePageSwitcherVisibility(false));
    }
  };
};

const PageSwitcherContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageSwitcherModal);

export default PageSwitcherContainer;

