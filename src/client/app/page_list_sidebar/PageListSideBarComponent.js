import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import dateUtils from '../utils/dateUtils';
import NumDaysToShow from './NumDaysToShow';
import AddPageComponent from './sub_components/AddPageComponent';
import PageLink from './sub_components/PageLink';
import styles from './styles.less';
import ClassNames from 'classnames/bind';

let cx = ClassNames.bind(styles);


var PageListSidebarComponent = React.createClass({
  propTypes: {
    currentPage: React.PropTypes.object.isRequired,
    customPages: React.PropTypes.array.isRequired,
    onPageChange: React.PropTypes.func.isRequired,
    onAddPage: React.PropTypes.func.isRequired,
    onShowPageSwitcher: React.PropTypes.func.isRequired
  },

  render: function () {
    const page = this.props.currentPage;
    var anchorDate = moment(page.anchorDate);

    var dates_to_display = _.map(_.range(
      -1*NumDaysToShow.backward, NumDaysToShow.forward+1,1), (days_delta) => {
      return anchorDate.clone().add(days_delta, 'days');
      });

    return (
      <div className={styles['sidebar-list-wrapper']}>
        {_.map(dates_to_display, (date_to_display) => {
          let bookmarkWrapperStyles = cx({
            'date-bookmark-wrapper': true,
            'current-bookmark-wrapper': dateUtils.getDateKey(date_to_display) == this.props.currentPage.page
          });
          return (
            <div key={dateUtils.getDateKey(date_to_display)}
                 className={bookmarkWrapperStyles}>
              <PageLink
                className={styles['date-bookmark']}
                onClick={this.props.onPageChange}
                identifier={dateUtils.getDateKey(date_to_display)}
                displayText={dateUtils.getDisplayDate(date_to_display)}
                displaySubText={dateUtils.getDateSubtext(date_to_display)}
                pageType="date"
              />
            </div>
            );
        })}
        <div className={styles['page-switcher-wrapper']}>
          <a className={styles['page-switcher']}
             onClick={() => {this.props.onShowPageSwitcher();}}>
            ...
          </a>
        </div>
        {_.map(this.props.customPages, (customPage) => {
          let bookmarkWrapperStyles = cx({
            'custom-bookmark-wrapper': true,
            'current-bookmark-wrapper': customPage.pageKey == this.props.currentPage.page
          });
          return (
            <div key={customPage.pageKey} className={bookmarkWrapperStyles}>
              <PageLink
                onClick={this.props.onPageChange}
                identifier={customPage.pageKey}
                displayText={customPage.displayName}
                pageType="custom"
              />
            </div>
            );
        })}
        <AddPageComponent
          onAddPage={this.props.onAddPage}
        />
      </div>
    );
  }
});

export default PageListSidebarComponent;
