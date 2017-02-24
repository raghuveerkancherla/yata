import React from 'react';
import AutoSuggestPageInput from '../page_list_sidebar/sub_components/AutoSuggestPage';
import {Modal} from 'react-bootstrap';
import Mousetrap from '../utils/mousetrap';
import styles from './styles.less';

var PageSwitcherModal = React.createClass({
  propTypes: {
    onPageChange: React.PropTypes.func,
    customPages: React.PropTypes.array,
    onAddPage: React.PropTypes.func,
    onShowPageSwitcher: React.PropTypes.func,
    onHidePageSwitcher: React.PropTypes.func,
    pageSwitcher: React.PropTypes.object
  },

  getInitialState: function () {
    return {
      pageKey: null, pageType: null
    };
  },

  componentDidMount: function () {
    Mousetrap.bindGlobal(['command+k'], this.open);

  },

  componentWillUnmount: function () {
    Mousetrap.unbindGlobal(['command+k'], this.open);

  },

  open: function() {
    this.props.onShowPageSwitcher();
  },

  close: function() {
    this.props.onHidePageSwitcher();
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
      this.close();
      this.setState({pageKey: pageKey, pageType: pageType});
    }
  },

  changePage: function () {
    if (this.state.pageKey && this.state.pageType){
      this.props.onPageChange(this.state.pageKey, this.state.pageType);
    }
  },

  render: function () {
    return (
      <Modal show={this.props.pageSwitcher.show} onHide={this.close} onExited={this.changePage}>
        <Modal.Body>
          <div className={styles['page-switcher-body']}>
            <div className={styles['help-text']}>Jump to a date or page</div>
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
