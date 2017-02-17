/**
 * Created by raghu on 10/02/17.
 */

const todo = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false,
        pages: [action.currentPage]
      };
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

const contentItems = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      var nextTodoID = state.length +1;
      action.id = nextTodoID.toString();
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'EDIT_TODO':
      return state.map(t =>
        todo(t, action)
      );
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
      );
    default:
      return state;
  }
};

export default contentItems;
