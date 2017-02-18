import Mousetrap from 'mousetrap';
import React from 'react';
import AutoSuggestPageInput from './AutoSuggestPage';
import {Modal} from 'react-bootstrap';

var PageSwitcherModal = React.createClass({
  propTypes: {
    onPageChange: React.PropTypes.func,
    customPages: React.PropTypes.array,
    onAddPage: React.PropTypes.func
  },

  getInitialState: function() {
    return { showModal: false };
  },

  componentDidMount: function () {
    Mousetrap.bind(['command+k'], this.open);
  },

  componentWillUnmount: function () {
    Mousetrap.unbind(['command+k'], this.open);
  },

  open: function() {
    this.setState({ showModal: true });
  },

  close: function() {
    this.setState({ showModal: false });
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
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Body>
          <div>
            <form onSubmit={this.handlePageChangeSubmit}>
              <AutoSuggestPageInput
                ref={(input) => {this.pageNameElement=input;}}
                customPages={this.props.customPages}
                onAddPage={this.props.onAddPage}
              />
            </form>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
});

export default PageSwitcherModal;



