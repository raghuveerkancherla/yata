
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './myCreateStore';
import Filters from './content_filters/Filters';
import PageListSidebarContainer from './page_list_sidebar/PageListSidebarContainer';
import VisibleContentItemContainer from './content_items/VisibleContentItemContainer';


render(
  <Provider store={store}>
    <div>
      <VisibleContentItemContainer />
      <Filters />
      <br/><br/>
      <PageListSidebarContainer />
    </div>
  </Provider>,
  document.getElementById('app')
);
