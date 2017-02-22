import React from 'react';
import ContentItem from './sub_components/ContentItem';
import EmptyContentItem from './sub_components/EmptyContentItem';
import _ from 'lodash';
import styles from './styles.less';


var ContentItemList = React.createClass({
  propTypes: {
    contentItems: React.PropTypes.array,
    currentPage: React.PropTypes.string,
    onContentItemToggle: React.PropTypes.func,
    onAddContentItem: React.PropTypes.func,
    saveContentofItem: React.PropTypes.func,
    onRemoveContentItem: React.PropTypes.func
  },

  handleItemContentOnBlur: function (itemId, value, status) {
    if (itemId){
      this.props.saveContentofItem(itemId, value);
    } else{
      this.props.onAddContentItem(
      value, this.props.currentPage, status);
    }
  },

  handleDoubleEnterOnItem: function (obj, contentBeforeCursor, contentAfterCursor) {
    const afterObjId = obj.props.id;
    obj.setState({'value': contentBeforeCursor});
    if (obj.props.id) {
      this.props.saveContentofItem(obj.props.id, contentBeforeCursor);
    } else {
      this.props.onAddContentItem(
      contentBeforeCursor, this.props.currentPage);
    }

    this.props.onAddContentItem(
      contentAfterCursor, this.props.currentPage, afterObjId);
  },

  render: function () {
    const numContentItems = this.props.contentItems.length;
    return (
      <div className={styles['content-items-wrapper']}>
        <div>
          <ContentItem
            isVisible={numContentItems == 0}
            onDoubleEnter={this.handleDoubleEnterOnItem}
            onBlur={this.handleItemContentOnBlur}
            totalContentItems={numContentItems}
          />
        </div>
        <div>
          {_.map(this.props.contentItems, function (contentItem) {
            return (<ContentItem
              key={contentItem.id}
              isVisible={true}
              totalContentItems={numContentItems}
              onDoubleEnter={this.handleDoubleEnterOnItem}
              onEmptyBackspace={this.props.onRemoveContentItem}
              onBlur={this.handleItemContentOnBlur}
              {...contentItem}
              onClick={() => this.props.onContentItemToggle(contentItem.id)}
            />);
          }.bind(this))}
        </div>
        <div className={styles['add-todo-helper']}>
          <span>
            use &crarr; &crarr; to add another todo
          </span>
        </div>

        <button
          onClick={() => this.props.onAddContentItem('', this.props.currentPage)}>
          Add (start with removing this)
        </button>

      </div>

    );
  }
});


export default ContentItemList;

