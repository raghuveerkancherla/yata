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
        'displayName': action.pageName}
      ];
    case 'CHANGE_PAGE':
      var existingPage = _.find(state, (page) => {
          return page.pageKey == action.pageKey;
      });

      if (action.pageType == 'custom' && !existingPage) {
        return [
        ...state,
        {'pageKey': action.pageKey,
        'displayName': action.pageKey}
      ];
      } else {
        return Object.assign([], state);
      }
    default:
      return Object.assign([], state);
  }
}

export default { currentPage, customPages };
