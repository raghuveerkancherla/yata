import Autosuggest from 'react-autosuggest';
import React from 'react';
import dateUtils from '../../utils/dateUtils';
import _ from 'lodash';
import AutoSuggestionStyles from './autosugestionstyles.less';

const AutoSuggestPageInput = React.createClass({
  propTypes: {
    customPages: React.PropTypes.array,
    onAddPage: React.PropTypes.func
  },

  getInitialState: function () {
    return {
      value: '',
      suggestions: [],
      userChoseAddPage: false,
      matchedSuggestion: null
    };
  },

  onChange: function(event, { newValue, method }) {
    if (newValue != 'AddPage' && method == 'type') {
      this.setState({
        value: newValue
      });
    }
  },

  onSuggestionsFetchRequested: function({ value }) {
    var suggestionsToShow;
    if (value.length == 0) {
      // get default suggestions to show
      suggestionsToShow = _.union(
        this.props.customPages,
        dateUtils.getDefaultDateSuggestions());
    } else {
      var suggestionList = _.union(
        this.props.customPages,
        dateUtils.getWeekDaySuggestions(),
        this._getDateSuggestions(value)
      );
      const filteredSuggestions = this._filterSuggestionsByValue(value, suggestionList);
      suggestionsToShow = _.union(filteredSuggestions, this._getAddPageSuggestion());
    }

    this.setState({
      suggestions: suggestionsToShow
    });
  },

  onSuggestionsClearRequested: function () {
    this.setState({
      suggestions: this._getAddPageSuggestion()
    });
  },

  onSuggestionSelected: function (e, {suggestion, suggestionValue, suggestionIndex, sectionIndex, method}) {
    if (suggestion.pageKey == 'AddPage'){
      this.props.onAddPage(this.state.value, 'custom');
      this.setState({userChoseAddPage: true});
    } else {
      this.setState({
        matchedSuggestion: suggestion
      });
    }
  },

  getSuggestionValue: function(suggestion) {
    return suggestion.pageKey;
  },

  _filterSuggestionsByValue: function (value, suggestionList) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? []: suggestionList.filter(suggestion =>
        suggestion.pageKey.toLowerCase().indexOf(inputValue) > -1 ||
        suggestion.displayName.toLowerCase().indexOf(inputValue) > -1 ||
        suggestion.searchText.toLowerCase().indexOf(inputValue) > -1
      );
  },

  _getDateSuggestions: function (userInput) {
    var nlDate = dateUtils.getDateFromNL(userInput);

    if (nlDate != null) {
      return [{
        'pageKey': dateUtils.getDateKey(nlDate),
        'displayName': dateUtils.getDisplayDate(nlDate),
        'date': nlDate,
        'pageType': 'date',
        'searchText': userInput
      }];
    } else {
      return [];
    }
  },

  _getAddPageSuggestion: function () {
    return [{
      'pageKey': 'AddPage',
      'displayName': 'Add new page'
    }];
  },

  renderSuggestion: function (suggestion) {
    return (
      <span>{suggestion.displayName}</span>
    );
  },

  render: function() {
    const { value, suggestions } = this.state;
    const inputProps = {
      id: 'page-autosuggest-input',
      placeholder: '',
      value,
      onChange: this.onChange,
      autoFocus: true
    };

    return (
      <Autosuggest
        theme={AutoSuggestionStyles}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
        alwaysRenderSuggestions={true}
      />
    );
  }
});

export default AutoSuggestPageInput;
