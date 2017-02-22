import React, {PropTypes} from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import styles from './styles.less';
import ReactDom from 'react-dom';


var EmptyContentItem = React.createClass({
  propTypes: {
    onDoubleEnter: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    onBlur: PropTypes.func
  },

  getInitialState: function () {
    return {
      'completed': false,
      value: ''
    };
  },

  handleOnBlur: function (e) {
    this.props.onBlur(
      undefined,
      this.state.value);
  },

  handleToggle: function (e) {
    this.setState({'completed': !this.state.completed});
  },

  handleKeyDown: function (event) {
    const inputCharacterCode = event.keyCode;
    const textContent = this.state.value;
    const cursorPosition = event.target.selectionEnd;
    const prevChar = textContent.charAt(cursorPosition - 1); // 10 if it is \n
    const prevKeyCode = (prevChar == '\n' || prevChar == '\r' ? 13 : null);

    if ((prevKeyCode == inputCharacterCode) && (inputCharacterCode == 13)) {
      var contentBeforeCursor = textContent.substring(0, cursorPosition - 1);
      var contentAfterCursor = textContent.substring(cursorPosition, textContent.length);
      this.props.onDoubleEnter(this, contentBeforeCursor, contentAfterCursor);
      event.preventDefault();
    }
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

    if (this.props.isVisible) {
      return (
        <div>
          <div className="row">
            <div className="col-xs-10">
              <TextareaAutosize
                style={textAreaStyle}
                ref={(input) => {
                  this.textArea = input;
                }}
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

export default EmptyContentItem;

