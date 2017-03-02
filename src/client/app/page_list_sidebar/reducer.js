import dateUtil from '../utils/dateUtils';
import moment from 'moment';
import _ from 'lodash';


function currentPage(state, action) {
  const pageForToday = {
    page: dateUtil.getDateKey(moment()),
    pageType: 'date',
    anchorDate: dateUtil.getDateKey(moment())
  };
  switch (action.type) {
    case 'CHANGE_PAGE':
      return Object.assign({}, state, {
        page: action.pageKey,
        pageType: action.pageType
      });
    case 'CHANGE_ANCHOR_DATE':
      return Object.assign({}, state, {
        anchorDate: action.anchorDate || dateUtil.getDateKey(moment())
      });
    default:
      return Object.assign({},  pageForToday, state);
  }
}

function customPages(state=[], action) {
  switch (action.type) {
    case 'ADD_PAGE':
      return [
        ...state,
        {'pageKey': action.pageName,
        'displayName': action.pageName,
        'pageType': action.pageType}
      ];
    case 'DELETE_PAGE':
      return _.filter(state, (page) => {
        return page.pageKey != action.pageKey;
      });
    default:
      return Object.assign([], state);
  }
}

export default { currentPage, customPages };
