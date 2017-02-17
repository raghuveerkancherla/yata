import React, {PropTypes} from 'react';
import TextareaAutosize from 'react-autosize-textarea';

var ContentItem = React.createClass({
  propTypes: {
    onClick: PropTypes.func.isRequired,
    handleContentOnBlur: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  },

  getInitialState: function () {
    return {
      value: this.props.text
    };
  },

  handleOnBlur: function (e) {
    this.props.handleContentOnBlur(
      this.props.id,
      this.state.value);
  },

  render: function () {
    return (
      <div>
        <TextareaAutosize
          autoFocus
          ref={(input) => {this.textArea=input;}}
          defaultValue={this.props.text}
          onChange={e => this.setState({value: e.target.value})}
          onBlur={this.handleOnBlur}
          rows={4}
        />
        <span onClick={this.props.onClick}>
          {this.props.completed ? "Done" : "WIP"}
        </span>

      </div>
    );
  }

});

export default ContentItem;
