import React from 'react';
import ContentItem from './ContentItem';
import _ from 'lodash';

var ContentItemList = React.createClass({
  propTypes: {
    contentItems: React.PropTypes.array,
    currentPage: React.PropTypes.string,
    onContentItemToggle: React.PropTypes.func,
    onAddContentItem: React.PropTypes.func,
    saveContentofItem: React.PropTypes.func
  },

  render: function () {
    return (
      <div>
        <ul>
          {_.map(this.props.contentItems, function (contentItem) {
            return (<ContentItem
              key={contentItem.id}
              handleContentOnBlur={this.props.saveContentofItem}
              {...contentItem}
              onClick={() => this.props.onContentItemToggle(contentItem.id)}
            />);
          }.bind(this))}
        </ul>
        <button
          onClick={() => this.props.onAddContentItem('', this.props.currentPage)}>
          Add
        </button>
      </div>

    );
  }
});


export default ContentItemList;

