import { createStore } from 'redux';
import rootReducer from './rootReducer';

function configureStore(initialState) {
  const store = (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./rootReducer', () => {
      const nextReducer = require('./rootReducer');
      store.replaceReducer(nextReducer);
    });
  }
  return store;
}
const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};
var store = configureStore(persistedState);

store.subscribe(()=>{
  console.log('storing data to local');
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;