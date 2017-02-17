import dateUtil from '../utils/dateUtils';
import moment from 'moment';
import _ from 'lodash';

function currentPage(state, action) {
  switch (action.type) {
    case 'CHANGE_PAGE':
      return {
        page: action.pageKey,
        pageType: action.pageType};
    default:
      var pageKeyToday = dateUtil.getDateKey(moment());
      var page = {page: pageKeyToday, pageType: 'date'};
      return Object.assign({},  page, state);
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
    default:
      return Object.assign([], state);
  }
}

export default { currentPage, customPages };
