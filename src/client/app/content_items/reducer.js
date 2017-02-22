/**
 * Created by raghu on 10/02/17.
 */
import _ from 'lodash';
import generateUid from '../utils/uniqueKeyGenerator';

const todo = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return emptyTodoForPage(action.currentPage, action.text);
    case 'EDIT_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        text: action.text
      });
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        completed: !state.completed
      });

    default:
      return state;
  }
};

const emptyTodoForPage = (page, text) => {
  var newTodoID = generateUid().toString();
  return {
        id: newTodoID,
        text: text,
        completed: false,
        pages: [page]
      };
}

const contentItems = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      var afterObjIndex = _.findIndex(
        state, (contentItem) => {return contentItem.id == action.afterObjId;});
      var newItemIndex = afterObjIndex < 0 ? state.length : afterObjIndex + 1;
      return [
        ..._.slice(state, 0, newItemIndex),
        todo(undefined, action),
        ..._.slice(state, newItemIndex)
      ];
    case 'EDIT_TODO':
      return state.map(t =>
        todo(t, action)
      );
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
      );
    case 'REMOVE_TODO':
      return _.filter(state, (todo) => {return todo.id != action.id});
    default:
      return state;
  }
};

export default contentItems;
