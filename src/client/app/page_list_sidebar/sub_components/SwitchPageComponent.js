import Mousetrap from 'mousetrap';
import React from 'react';
import AutoSuggestPageInput from './AutoSuggestPage';

var SwitchPageComponent = React.createClass({
  propTypes: {
    onPageChange: React.PropTypes.func,
    customPages: React.PropTypes.array,
    onAddPage: React.PropTypes.func
  },

  getInitialState: function () {
    return {
      pageSwitcherVisibility: 'hidden',
      pageNotFoundVisibility: 'hidden'
    };
  },

  componentDidMount: function () {
    Mousetrap.bind(['command+k'], this.showPageSwitcher);
  },

  componentDidUpdate(prevProps, prevState) {
    if (prevState.pageSwitcherVisibility == 'hidden' && this.state.pageSwitcherVisibility == 'visible') {
      // We transitioned from hidden to shown. Focus the text box.
      // this.pageNameElement.focus();
      document.getElementById('page-autosuggest-input').focus();
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

  handlePageChangeSubmit: function (e) {
    e.preventDefault();
    var matchedSuggestion = this.pageNameElement.state.matchedSuggestion;
    var userChoseAdd = this.pageNameElement.state.userChoseAddPage;

    if (!userChoseAdd && matchedSuggestion == null){
      this.setState({pageNotFoundVisibility: 'visible'});
    } else {
      var pageName = this.pageNameElement.state.value;
      var pageKey = matchedSuggestion ? matchedSuggestion.pageKey : pageName;
      var pageType = matchedSuggestion ? matchedSuggestion.pageType : 'custom';

      this.props.onPageChange(pageKey, pageType);
      this.setState({pageSwitcherVisibility: 'hidden', pageNotFoundVisibility: 'hidden'});
    }
  },

  render: function () {
    var pageSwitcherStyle = {
      visibility: this.state.pageSwitcherVisibility
    };
    var pageNotFoundStyle = {
      visibility: this.state.pageNotFoundVisibility
    };
    return (
      <div>
        <a onClick={this.showPageSwitcher}><b>Switch Page</b></a>
        <div style={pageSwitcherStyle}>
          <form onSubmit={this.handlePageChangeSubmit}>
            <AutoSuggestPageInput
              id="page-autosuggest-input"
              ref={(input) => {this.pageNameElement=input;}}
              customPages={this.props.customPages}
              onAddPage={this.props.onAddPage}
            />
            <input type="submit" value="Save"/>
            <span style={pageNotFoundStyle}>Page Not found</span>
          </form>
        </div>
      </div>
    );
  }
});

export default SwitchPageComponent;


