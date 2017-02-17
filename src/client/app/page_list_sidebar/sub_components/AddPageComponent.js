import React from 'react';

var AddPageComponent = React.createClass({
  propTypes: {
    onAddPage: React.PropTypes.func
  },

  getInitialState: function () {
    return {addPageVisibility: 'hidden'};
  },

  componentDidUpdate(prevProps, prevState) {
    if (prevState.addPageVisibility == 'hidden' && this.state.addPageVisibility == 'visible') {
      // We transitioned from hidden to shown. Focus the text box.
      this.pageNameElement.focus();
    }
  },

  onAddPageClick: function (e) {
    e && e.preventDefault();
    // show Add new page form
    this.setState({addPageVisibility: 'visible'});
  },

  handleAddPageSubmit: function (e) {
    e.preventDefault();
    var newPageName = this.pageNameElement.value;
    this.props.onAddPage(newPageName);
    this.setState({addPageVisibility: 'hidden'});
  },

  render: function () {
    var style = {
      visibility: this.state.addPageVisibility
    };
    return (
      <div>
        <a onClick={this.onAddPageClick}><b> +Add new page </b></a>
        <div style={style}>
          <form onSubmit={this.handleAddPageSubmit}>
            <input type="text" ref={(input) => {this.pageNameElement=input;}}/>
            <input type="submit" value="Save"/>
          </form>
        </div>
      </div>
    );
  }
});

export default AddPageComponent;
