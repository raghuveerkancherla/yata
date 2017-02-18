import Autosuggest from 'react-autosuggest';
import React from 'react';
import dateUtils from '../../utils/dateUtils';
import _ from 'lodash';
import AutoSuggestTheme from './AutoSuggestStyles.css';

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
    var suggestionList = _.union(
      this.props.customPages,
      dateUtils.getWeekDaySuggestions()
    );

    var nlDate = dateUtils.getDateFromNL(value);

    if (nlDate != null) {
      suggestionList = _.union(
        suggestionList,
        [{'pageKey': dateUtils.getDateKey(nlDate),
          'displayName': dateUtils.getDisplayDate(nlDate),
          'date': nlDate,
          'pageType': 'date'
        }]
      );
    }

    var suggestions = this.getSuggestions(value, suggestionList);
    var addPageSuggestion =[{
      'pageKey': 'AddPage',
      'displayName': 'Add new page'
    }];

    this.setState({
      suggestions: _.union(suggestions, addPageSuggestion)
    });
  },

  onSuggestionsClearRequested: function () {
    this.setState({
      suggestions: [{
        'pageKey': 'AddPage',
        'displayName': 'Add new page'
      }]
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

  getSuggestions: function(value, suggestionList) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : suggestionList.filter(page =>
      page.pageKey.toLowerCase().indexOf(inputValue) > -1 ||
      page.displayName.toLowerCase().indexOf(inputValue) > -1
    );
  },

  getSuggestionValue: function(suggestion) {
    return suggestion.pageKey;
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
      placeholder: 'Type anything',
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        theme={AutoSuggestTheme}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
});

export default AutoSuggestPageInput;
