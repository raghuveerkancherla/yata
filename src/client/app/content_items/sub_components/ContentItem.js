import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import TextareaAutosize from 'react-autosize-textarea';
import styles from './styles.less';
import ClassNames from 'classnames/bind';
import Mousetrap from 'mousetrap';


var cx = ClassNames.bind(styles);

var ContentItem = React.createClass({
  propTypes: {
    onBlur: PropTypes.func.isRequired,
    onDoubleEnter: PropTypes.func.isRequired,
    totalContentItems: PropTypes.number.isRequired,

    shouldFocus:PropTypes.bool,
    id: PropTypes.string,
    onItemToggle: PropTypes.func,
    onEmptyBackspace: PropTypes.func,
    text: PropTypes.string,
    completed: PropTypes.bool,
    isVisible: PropTypes.bool
  },

  getInitialState: function () {
    return {
      completed: this.props.completed || false,
      value: this.props.text,
      shouldAutoFocus: this.props.shouldFocus
    };
  },

  componentDidMount: function () {
    let thisDomObj = ReactDOM.findDOMNode(this);
    this.mousetrap = new Mousetrap(thisDomObj);
    this.mousetrap.bind(['enter enter'], this.handleDoubleEnter);
    this.mousetrap.bind('backspace', this.handleBackSpace);
  },

  componentWillUnmount: function () {
    this.mousetrap.unbind(['enter enter'], this.handleDoubleEnter);
    this.mousetrap.unbind('backspace', this.handleBackSpace);
  },

  handleDoubleEnter: function (event) {
    //ensure same key bindings on other text areas dont get called
    event.stopPropagation();
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      // for ie;
      event.returnValue = false;
    }
    const textContent = this.state.value || '';
    const cursorPosition = event.target.selectionEnd;
    var contentBeforeCursor = textContent.substring(0, cursorPosition-1);
    var contentAfterCursor = textContent.substring(cursorPosition, textContent.length);
    this.props.onDoubleEnter(this, contentBeforeCursor, contentAfterCursor);
  },

  handleBackSpace: function (event) {
    event.stopPropagation();
    const textContent = this.state.value || '';
    if (textContent.length == 0 && this.props.id) {
      this.props.onEmptyBackspace(this.props.id);
      if (event.preventDefault){
        event.preventDefault();
      } else {
        // for ie;
        event.returnValue = false;
      }
    }
  },

  handleOnBlur: function (e) {
    this.props.onBlur(
      this.props.id,
      this.state.value,
      this.state.completed
    );
  },

  handleToggle: function (e) {
    this.setState({'completed': !this.state.completed});
    this.props.onItemToggle && this.props.onItemToggle(e);
  },

  render: function () {
    // could not figure out how to make textareaautosize work with css modules
    var textAreaStyle = {
      width: '100%',
      fontSize: 16,
      outline: 'none',
      border: 'none',
      resize: 'none'
    };

    let contentItemWrapperClass = cx(
      {'content-item-wrapper': true,
        'content-item-border': this.props.totalContentItems > 1}
    );

    if (this.props.isVisible) {
      return (
        <div className={contentItemWrapperClass}>
        <div className="row">
          <div className="col-xs-10">
            <TextareaAutosize
              autoFocus={this.state.shouldAutoFocus}
              style={textAreaStyle}
              className="mousetrap"
              ref={(input) => {this.textArea=input;}}
              value={this.state.value}
              placeholder="Add a todo..."
              onChange={e => this.setState({value: e.target.value})}
              onBlur={this.handleOnBlur}
              onKeyDown={this.handleKeyDown}
            />
          </div>
          <div className="col-xs-2">
            <span className={styles['reminder-wrapper']}>
              rem
            </span>
            <span onClick={this.handleToggle}>
              {this.state.completed ? "Done" : "WIP"}
            </span>
          </div>
        </div>
      </div>
      );
    } else {
      return null;
    }
  }
});

export default ContentItem;
