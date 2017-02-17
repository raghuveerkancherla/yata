import { combineReducers } from 'redux';
import contentItems from './content_items/reducer';
import visibilityFilter from './content_filters/reducer';
import page_list_reducer from './page_list_sidebar/reducer';

const rootReducer = combineReducers({
  contentItems,
  visibilityFilter,
  currentPage: page_list_reducer.currentPage,
  customPages: page_list_reducer.customPages
});

export default rootReducer;

