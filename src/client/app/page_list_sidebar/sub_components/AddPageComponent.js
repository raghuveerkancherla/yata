import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.less';
import {Popover, Overlay} from 'react-bootstrap';

var AddPageComponent = React.createClass({
  propTypes: {
    onAddPage: React.PropTypes.func
  },

  getInitialState: function () {
    return {
      'display': false
    };
  },

  handleAddPageSubmit: function (e) {
    e && e.preventDefault();
    var newPageName = this.pageNameElement.value;
    this.props.onAddPage(newPageName);
    this.setState({'display': false});
  },

  render: function () {
    const addPagePopover = (
      <Popover title="Add a new page" id="add-page-popover">
        <div>
          <form onSubmit={this.handleAddPageSubmit}>
            <input type="text"
                   ref={(input) => {this.pageNameElement=input;}}
                   placeholder="Ex: Holiday planning"
                   autoFocus={true}
            />
            <input type="submit" value="Save"/>
          </form>
        </div>
      </Popover>
    );
    return (
      <div>
        <Overlay placement="bottom" show={this.state.display}
                 onHide={() => {this.setState({'display': false});}}
                 target={() => (ReactDOM.findDOMNode(this.addPageButton))}
                 rootClose={true}>
          {addPagePopover}
        </Overlay>
        <a className={styles['add-page-link']}
          ref={(inp) => (this.addPageButton = inp)}
          onClick={() => (this.setState({'display': true}))}
        > + Add new </a>
      </div>
    );
  }
});

export default AddPageComponent;
