import React from 'react';

var PageLink = React.createClass({
  propTypes: {
    identifier: React.PropTypes.string.isRequired,
    displayText: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func,
    pageType: React.PropTypes.string
  },

  handleClick: function (e) {
    e.preventDefault();
    this.props.onClick(this.props.identifier, this.props.pageType);
  },

  render: function () {
    return (
      <div>
        &nbsp;
        <a onClick={this.handleClick}>
          {this.props.displayText}
        </a>&nbsp;
      </div>
    );
  }
});


export default PageLink;