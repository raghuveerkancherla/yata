import { createStore } from 'redux';
import rootReducer from './rootReducer';

export default function configureStore(initialState) {
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
