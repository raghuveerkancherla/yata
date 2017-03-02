import React from 'react';
import ContentItem from './sub_components/ContentItem';
import _ from 'lodash';
import styles from './styles.less';


var ContentItemList = React.createClass({
  propTypes: {
    contentItems: React.PropTypes.array,
    currentPage: React.PropTypes.string,
    onContentItemToggle: React.PropTypes.func,
    onAddContentItem: React.PropTypes.func,
    saveContentofItem: React.PropTypes.func,
    onRemoveContentItem: React.PropTypes.func,
    onShowPageSwitcher: React.PropTypes.func,
    onHidePageSwitcher: React.PropTypes.func

  },

  handleItemContentOnBlur: function (itemId, value, status) {
    if (itemId){
      this.props.saveContentofItem(itemId, value, false);
    } else{
      this.props.onAddContentItem(
      value, this.props.currentPage, status, null);
    }
  },

  handleRemoveItem: function (idToRemove) {
    const indexToRemove = _.findIndex(
      this.props.contentItems, (ci) => {return ci.id == idToRemove;});
    var indexToFocusNext;
    if (indexToRemove == -1){
      indexToFocusNext = null;
    } else if (indexToRemove == 0) {
      indexToFocusNext = 1;
    } else {
      indexToFocusNext = indexToRemove -1;
    }
    const idToFocusNext = indexToFocusNext == null ? null :
      this.props.contentItems[indexToFocusNext].id;
    this.props.onRemoveContentItem(idToRemove, idToFocusNext);
  },

  handleDoubleEnterOnItem: function (obj, contentBeforeCursor, contentAfterCursor) {
    const afterObjId = obj.props.id;
    obj.setState({'value': contentBeforeCursor});
    if (obj.props.id) {
      this.props.saveContentofItem(obj.props.id, contentBeforeCursor, false);
    } else {
      this.props.onAddContentItem(
      contentBeforeCursor, this.props.currentPage);
    }

    this.props.onAddContentItem(
      contentAfterCursor, this.props.currentPage, null, afterObjId);
  },

  render: function () {
    const numContentItems = this.props.contentItems.length;
    const itemToFocus = _.find(this.props.contentItems, (ci) => {return ci.isFocused;}) ||
      _.last(this.props.contentItems);
    const itemIDToFocus = itemToFocus && itemToFocus.id;
    return (
      <div className={styles['content-items-wrapper']}>
        <div>
          <ContentItem
            key={this.props.currentPage}
            isVisible={numContentItems == 0}
            shouldFocus={true}
            onDoubleEnter={this.handleDoubleEnterOnItem}
            onBlur={this.handleItemContentOnBlur}
            totalContentItems={numContentItems}
            onShowPageSwitcher={this.props.onShowPageSwitcher}
            onHidePageSwitcher={this.props.onHidePageSwitcher}
            text={""}
          />
        </div>
        <div>
          {_.map(this.props.contentItems, function (contentItem) {
            var shouldFocus = contentItem.isFocused || (contentItem.id == itemIDToFocus);
            return (<ContentItem
              key={contentItem.id + shouldFocus}
              isVisible={true}
              shouldFocus={shouldFocus}
              totalContentItems={numContentItems}
              onDoubleEnter={this.handleDoubleEnterOnItem}
              onEmptyBackspace={this.handleRemoveItem}
              onBlur={this.handleItemContentOnBlur}
              {...contentItem}
              onItemToggle={() => this.props.onContentItemToggle(contentItem.id)}
              onShowPageSwitcher={this.props.onShowPageSwitcher}
              onHidePageSwitcher={this.props.onHidePageSwitcher}
            />);
          }.bind(this))}
        </div>
        <div className={styles['add-todo-helper']}>
          <span>
            use &crarr; &crarr; to add another todo
          </span>
        </div>
      </div>

    );
  }
});


export default ContentItemList;

