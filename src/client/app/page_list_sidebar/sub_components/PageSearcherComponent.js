import Mousetrap from 'mousetrap';
import React from 'react';
import AutoSuggestPageInput from './AutoSuggestPage';


var PageSearchComponent = React.createClass({
  propTypes: {
    onPageChange: React.PropTypes.func,
    customPages: React.PropTypes.array
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
      this.pageNameElement.setState({'value': ''});
    }
  },

  render: function () {
    return (
      <div>
        <form onSubmit={this.handlePageChangeSubmit}>
          <AutoSuggestPageInput
            ref={(input) => {this.pageNameElement=input;}}
            customPages={this.props.customPages}
          />
        </form>
      </div>

    );
  }
});

export default PageSearchComponent;
