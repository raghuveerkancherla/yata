
function pageSwitcher(state, action) {
  switch (action.type) {
    case 'CHANGE_PAGE_SWITCHER_VISIBILITY':
      return {
        show: action.status
      };
    default:
      var pageSwitcherData = {show:false};
      return Object.assign({},  pageSwitcherData, state);
  }
}


export default pageSwitcher;

