import Mousetrap from 'mousetrap';
import React from 'react';
import dateUtils from '../../utils/dateUtils';

var SwitchPageComponent = React.createClass({
  propTypes: {
    onPageChange: React.PropTypes.func
  },

  getInitialState: function () {
    return {pageSwitcherVisibility: 'hidden'};
  },

  componentDidMount: function () {
    Mousetrap.bind(['command+k'], this.showPageSwitcher);
  },

  componentDidUpdate(prevProps, prevState) {
    if (prevState.pageSwitcherVisibility == 'hidden' && this.state.pageSwitcherVisibility == 'visible') {
      // We transitioned from hidden to shown. Focus the text box.
      this.pageNameElement.focus();
    }
  },

  componentWillUnmount: function () {
    Mousetrap.unbind(['command+k'], this.showPageSwitcher);
  },

  showPageSwitcher: function (e) {
    e && e.preventDefault();
    // show switch page form
    this.setState({pageSwitcherVisibility: 'visible'});
  },

  handlePageChange: function (e) {
    e.preventDefault();
    var pageName;
    pageName = this.pageNameElement.value;
    var parsedDate = dateUtils.getDateFromNL(pageName);

    var pageType = parsedDate != null ? 'date' : 'custom';
    pageName = parsedDate != null ? dateUtils.getDateKey(parsedDate) : pageName;

    this.props.onPageChange(pageName, pageType);
    this.setState({pageSwitcherVisibility: 'hidden'});
  },

  render: function () {
    var style = {
      visibility: this.state.pageSwitcherVisibility
    };
    return (
      <div>
        <a onClick={this.showPageSwitcher}><b>Switch Page</b></a>
        <div style={style}>
          <form onSubmit={this.handlePageChange}>
            <input type="text" ref={(input) => {this.pageNameElement=input;}}/>
            <input type="submit" value="Save"/>
          </form>
        </div>
      </div>
    );
  }
});

export default SwitchPageComponent;


