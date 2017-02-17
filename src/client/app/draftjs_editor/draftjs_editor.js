import React from 'react';
import { Map } from 'immutable';
import {
    Editor,
    EditorState,
    DefaultDraftBlockRenderMap
} from 'draft-js';
import { EditorBlock } from 'draft-js';


const updateDataOfBlock = (editorState, block, newData) => {
  const contentState = editorState.getCurrentContent();
  const newBlock = block.merge({
    data: newData
  });
  const newContentState = contentState.merge({
    blockMap: contentState.getBlockMap().set(block.getKey(), newBlock)
  });
  return EditorState.push(editorState, newContentState, 'change-block-type');
};

class TodoBlock extends React.Component {
    constructor(props) {
        super(props);
        this.updateData = this.updateData.bind(this);
    }

    updateData() {
        const { block, blockProps } = this.props;

        // This is the reason we needed a higher-order function for blockRendererFn
        const { onChange, getEditorState } = blockProps;
        const data = block.getData();
        const checked = (data.has('checked') && data.get('checked') === true);
        const newData = data.set('checked', !checked);
        onChange(updateDataOfBlock(getEditorState(), block, newData));
    }

    render() {
        console.log('rendering the todo item')
        const data = this.props.block.getData();
        const checked = data.get('checked') === true;
        return (
          <div className={checked ? 'block-todo-completed' : ''}>
            <input type="checkbox" checked={checked} onChange={this.updateData} />
            <EditorBlock {...this.props} />
          </div>
        );
    }
}


/*
A higher-order function.
*/
const getBlockRendererFn = (getEditorState, onChange) => (block) => {

    const type = block.getType();
    switch(type) {
        case 'todo':
            return {
                component: TodoBlock,
                props: {
                    getEditorState,
                    onChange
                }
            };
        default:
            return null;
    }
};

/*
Returns default block-level metadata for various block type. Empty object otherwise.
*/
const getDefaultBlockData = (blockType, initialData = {}) => {
  switch (blockType) {
    case 'TODO_BLOCK': return { checked: false };
    default: return initialData;
  }
};

/*
Changes the block type of the current block.
*/
const resetBlockType = (editorState, newType = 'unstyled') => {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const key = selectionState.getStartKey();
  const blockMap = contentState.getBlockMap();
  const block = blockMap.get(key);
  let newText = '';
  const text = block.getText();
  if (block.getLength() >= 2) {
    newText = text.substr(1);
  }
  const newBlock = block.merge({
    text: newText,
    type: newType,
    data: getDefaultBlockData(newType),
  });
  const newContentState = contentState.merge({
    blockMap: blockMap.set(key, newBlock),
    selectionAfter: selectionState.merge({
      anchorOffset: 0,
      focusOffset: 0,
    }),
  });
  return EditorState.push(editorState, newContentState, 'change-block-type');
};


class MyTodoListEditor extends React.Component {

    constructor(props) {
        super(props);

        /* blockRenderMap */
        this.blockRenderMap = Map({
            ['TODO_BLOCK']: {
                element: 'div'
            }
        }).merge(DefaultDraftBlockRenderMap);

        this.state = {
            editorState: EditorState.createEmpty()
        };

        this.onChange = (editorState) => this.setState({ editorState });

        /*
        This function will be passed to getBlockRendererFn so that
        the component can access the latest editorState instead of an
        instance at some point.
        */
        this.getEditorState = () => this.state.editorState;

        // Get a blockRendererFn from the higher-order function.
        this.blockRendererFn = getBlockRendererFn(
            this.getEditorState, this.onChange);
        this.handleBeforeInput = this.handleBeforeInput.bind(this);
    }

    blockStyleFn(block) {
        switch (block.getType()) {
          case 'TODO_BLOCK':
            return 'block block-todo';
          default:
            return 'block';
        }
    }

    handleBeforeInput(str) {
      if (str !== ']') {
        return false;
      }
      debugger;
      const { editorState } = this.state;
      /* Get the selection */
      const selection = editorState.getSelection();

      /* Get the current block */
      const currentBlock = editorState.getCurrentContent()
        .getBlockForKey(selection.getStartKey());
      const blockType = currentBlock.getType();
      const blockLength = currentBlock.getLength();
      if (blockLength === 1 && currentBlock.getText() === '[') {
        this.onChange(resetBlockType(editorState, blockType !== 'TODO_BLOCK' ? 'TODO_BLOCK' : 'unstyled'));
        return true;
      }
      return false;
    }
    render () {
        return (
            <Editor
                editorState={this.state.editorState}
                handleBeforeInput={this.handleBeforeInput}
                onChange={this.onChange}
                blockRenderMap={this.blockRenderMap}
                blockRendererFn={this.blockRendererFn}
                blockStyleFn={this.blockStyleFn} />
        );
    }
}

export default MyTodoListEditor;
