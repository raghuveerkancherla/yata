
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './myCreateStore';
import Filters from './content_filters/Filters';
import PageListSidebarContainer from './page_list_sidebar/PageListSidebarContainer';
import VisibleContentItemContainer from './content_items/VisibleContentItemContainer';
import styles from './styles.less';

render(
  <Provider store={store}>
    <div className="container">
      <div className={styles['yata-row-wrapper']}>
        <div className="row">
          <div className="col-xs-10">
            <Filters/>
            <VisibleContentItemContainer/>
          </div>
          <div className="col-xs-2">
            <PageListSidebarContainer />
          </div>
        </div>
      </div>

    </div>
  </Provider>,
  document.getElementById('app')
);
