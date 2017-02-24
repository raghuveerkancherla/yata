import React, {PropTypes} from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import styles from './styles.less';
import ClassNames from 'classnames/bind';

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
      value: this.props.text
    };
  },

  componentDidMount: function(){
    // this.textArea.focus();
  },

  handleOnBlur: function (e) {
    this.props.onBlur(
      this.props.id,
      this.state.value,
      this.state.completed,

    );
  },

  handleToggle: function (e) {
    this.setState({'completed': !this.state.completed});
    this.props.onItemToggle && this.props.onItemToggle(e);
  },

  handleKeyDown: function (event) {
    const inputCharacterCode = event.keyCode;
    const textContent = this.state.value || '';
    const cursorPosition = event.target.selectionEnd;
    const prevChar = textContent.charAt(cursorPosition-1); // 10 if it is \n
    const prevKeyCode = (prevChar == '\n' || prevChar == '\r' ? 13 : null);

    if (inputCharacterCode == 8 && textContent.length == 0 && this.props.id) {
      this.props.onEmptyBackspace(this.props.id);
      event.preventDefault();
    }

    if ((prevKeyCode == inputCharacterCode) && (inputCharacterCode == 13)) {
      var contentBeforeCursor = textContent.substring(0, cursorPosition-1);
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
              autoFocus={this.props.shouldFocus}
              style={textAreaStyle}
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
