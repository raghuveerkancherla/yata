import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import dateUtils from '../utils/dateUtils';
import NumDaysToShow from './NumDaysToShow';
import AddPageComponent from './sub_components/AddPageComponent';
import PageLink from './sub_components/PageLink';
import SwitchPageComponent from './sub_components/SwitchPageComponent';

var PageListSidebarComponent = React.createClass({
  propTypes: {
    currentPage: React.PropTypes.object.isRequired,
    customPages: React.PropTypes.array.isRequired,
    onPageChange: React.PropTypes.func.isRequired,
    onAddPage: React.PropTypes.func.isRequired
  },

  render: function () {
    var dates_to_display = _.map(_.range(
      -1*NumDaysToShow.backward, NumDaysToShow.forward+1,1), (days_delta) => {
      return moment().add(days_delta, 'days');
      });

    return (
      <div>
        {_.map(dates_to_display, (date_to_display) => {
          return (<PageLink
            key={dateUtils.getDateKey(date_to_display)}
            onClick={this.props.onPageChange}
            identifier={dateUtils.getDateKey(date_to_display)}
            displayText={dateUtils.getDisplayDate(date_to_display)}
            pageType="date"
          />);
        })}
        {_.map(this.props.customPages, (customPage) => {
          return (<PageLink
            key={customPage.pageKey}
            onClick={this.props.onPageChange}
            identifier={customPage.pageKey}
            displayText={customPage.displayName}
            pageType="custom"
          />);
        })}

        <AddPageComponent
          onAddPage={this.props.onAddPage}
        />
        <SwitchPageComponent
          onPageChange={this.props.onPageChange}
          customPages={this.props.customPages}
          onAddPage={this.props.onAddPage}
        />
      </div>
    );
  }
});

export default PageListSidebarComponent;
