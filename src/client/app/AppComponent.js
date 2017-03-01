import React from 'react';
import Filters from './content_filters/Filters';
import PageListSidebarContainer from './page_list_sidebar/PageListSidebarContainer';
import VisibleContentItemContainer from './content_items/VisibleContentItemContainer';
import styles from './styles.less';
import ClassNames from 'classnames/bind';
import PageSwitcherContainer from './page_switcher/PageSwitcherContainer';
import DeletePageContainer from './delete_page/DeletePageContainer';

let cx = ClassNames.bind(styles);

var AppComponent = React.createClass({
  render: function () {
    let leftColContent = cx('col-xs-10', 'left-col-content');
    return (
      <div>
        <div className="container">
          <div className={styles['yata-row-wrapper']}>
            <div className="row">
              <div className={leftColContent}>
                <Filters/>
                <VisibleContentItemContainer/>
                <div className={styles['delete-page-wrapper']}>
                  <DeletePageContainer/>
                </div>
              </div>
              <div className="col-xs-2">
                <PageListSidebarContainer />
              </div>
            </div>
          </div>
        </div>
        <PageSwitcherContainer/>
      </div>

    );
  }
});

export default AppComponent;