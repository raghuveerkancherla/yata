import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import styles from './styles.less';
import ClassNames from 'classnames/bind';
import {Button, Popover, Overlay} from 'react-bootstrap';
import dateUtils from '../utils/dateUtils';

let cx = ClassNames.bind(styles);

var DeletePageComponent = React.createClass({
  propTypes: {
    currentPage: React.PropTypes.object.isRequired,
    numTodosCurrentPage: React.PropTypes.number.isRequired,
    onDeletePage: React.PropTypes.func.isRequired,
    customPages: React.PropTypes.array.isRequired
  },

  getInitialState: function () {
    return {
      displayConfirmBox: false
    };
  },

  getNextCustomPageKey: function() {
    if (this.props.customPages.length <= 1) {
      return null;
    } else {
      let currPageIndex = _.findIndex(this.props.customPages, (page) => {
        return page.id == this.props.currentPage.id;
      });
      // if we are removing the first page, get the next one else get the previous one
      let nextPageIndex = currPageIndex == 0 ? currPageIndex + 1 : currPageIndex - 1;
      return this.props.customPages[nextPageIndex].pageKey;
    }
  },

  deletePage: function () {
    this.setState({'displayConfirmBox': false});
    const nextCustomPageKey = this.getNextCustomPageKey();
    const nextPageKey = nextCustomPageKey || dateUtils.getDateKey(dateUtils.getStartOfToday());
    const nextPageType = nextCustomPageKey == null ? 'date' : 'custom';
    this.props.onDeletePage(this.props.currentPage.page, nextPageKey, nextPageType);
  },

  handleDeleteOrConfirm: function (e) {
    if (this.props.currentPage.pageType == 'date') {
      e.preventDefault();
      return;
    } else if (this.props.numTodosCurrentPage > 0) {
      this.setState({'displayConfirmBox': true});
    } else {
      this.deletePage();
    }
    e.preventDefault();
  },

  render: function () {
    const deletePagePopover = (
      <Popover id="delete-page-popover">
        <div>
          <div>
            There are {this.props.numTodosCurrentPage} tasks on this page.
            All of them will be deleted.
          </div>
          <Button className={styles['dialog-buttons']}>Cancel</Button>
          <Button
            className={styles['dialog-buttons']}
            bsStyle="danger"
            onClick={this.deletePage}
          >Got it! Delete</Button>
        </div>
      </Popover>
    );
    let deletePageClassnames = cx({
      'delete-page': true,
      'disabled': this.props.currentPage.pageType == 'date'
    });
    return (
      <div>
        <Overlay placement="top" show={this.state.displayConfirmBox}
                 onHide={() => {this.setState({'displayConfirmBox': false});}}
                 target={() => (ReactDOM.findDOMNode(this.deletePageButton))}
                 rootClose={true}>
          {deletePagePopover}
        </Overlay>
        <a className={deletePageClassnames}
          ref={(inp) => (this.deletePageButton = inp)}
          onClick={this.handleDeleteOrConfirm}
        > delete </a>
      </div>);
  }
});

export default DeletePageComponent;
