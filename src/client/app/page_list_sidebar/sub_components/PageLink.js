import React from 'react';
import styles from './styles.less';


var PageLink = React.createClass({
  propTypes: {
    identifier: React.PropTypes.string.isRequired,
    displayText: React.PropTypes.string.isRequired,
    displaySubText: React.PropTypes.string,
    onClick: React.PropTypes.func,
    pageType: React.PropTypes.string
  },

  handleClick: function (e) {
    e.preventDefault();
    this.props.onClick(this.props.identifier, this.props.pageType);
  },

  render: function () {
    let subText = this.props.displaySubText ? (
      <span className ={styles['date-sub-text']}>
        {this.props.displaySubText}
      </span>
    ) : null;
    return (
      <a onClick={this.handleClick} className={styles['date-bookmark']}>
          <span className={styles['bookmark-text']}>{this.props.displayText}</span>
          &nbsp;&nbsp;{subText}
      </a>
    );
  }
});


export default PageLink;