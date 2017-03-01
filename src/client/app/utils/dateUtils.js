import moment from 'moment';
import chrono from 'chrono-node';
import _ from 'lodash';
import getDateSubtext from './dateSubTextGenerator';

function getDisplayDate(date) {
  return date.format("D MMM");
}

function getDateKey(date) {
  return date.format("YYYY/MM/DD");
}


function getDateSuggestionsFromNL(userInput){
  var date = chrono.parseDate(userInput);
  if (date == null) {
    return [];
  } else {
    const mDate = moment(date);
    return [{
      'pageKey': getDateKey(mDate),
      'displayName': getDisplayDate(mDate),
      'date': moment(date),
      'pageType': 'date',
      'searchText': userInput
    }];
  }
}

function getDefaultDateSuggestions() {
  const today = moment();
  const tomorrow = moment().add(1, 'days');
  const twoDaysFromNow = moment().add(2, 'days');
  const nextWeekSameDay = moment().add(7, 'days');
  const nextMondayDelta = 7 - moment().day() + 1;
  const nextMonday = moment().add(nextMondayDelta, 'days');

  let suggestionDates = _.uniq([today, tomorrow, twoDaysFromNow, nextMonday, nextWeekSameDay]);
  const suggestions = _.map(suggestionDates, (date) => {
    let dateSubText = getDateSubtext(date, 'SEARCH_SUGGESTIONS');
    return {
      pageKey: getDateKey(date),
      date: date,
      pageType: 'date',
      displayName: dateSubText,
      searchText: date.format('dddd') + ' ' + (dateSubText || '')
    };
  });
  return suggestions;
}

function getWeekDaySuggestions() {
  const nextMondayDelta = 7 - moment().day() + 1;
  const thisMondayDelta = 1 - moment().day();
  const lastMondayDelta = 1 - moment().day() - 7;
  const nextMonday = moment().add(nextMondayDelta, 'days');
  const thisMonday = moment().add(thisMondayDelta, 'days');
  const lastMonday = moment().add(lastMondayDelta, 'days');

  let thisWeekDays = _.map(_.range(0,6,1), function (delta) {
    var date = thisMonday.clone();
    date.add(delta, 'days');
    let dateSubText = getDateSubtext(date, 'SEARCH_SUGGESTIONS')
    return {
      pageKey: getDateKey(date),
      displayName: dateSubText,
      date: date,
      pageType: 'date',
      searchText: date.format('dddd') + ' ' + (dateSubText || '')
    };
  });

  let nextWeekDays = _.map(_.range(0,6,1), function (delta) {
    var date = nextMonday.clone();
    date.add(delta, 'days');
    let dateSubText = getDateSubtext(date, 'SEARCH_SUGGESTIONS');
    return {
      pageKey: getDateKey(date),
      displayName: dateSubText,
      date: date,
      pageType: 'date',
      searchText: date.format('dddd') + ' ' + (dateSubText || '')
    };
  });
  let prevWeekDays = _.map(_.range(0,6,1), function (delta) {
    var date = lastMonday.clone();
    date.add(delta, 'days');
    let dateSubText = getDateSubtext(date, 'SEARCH_SUGGESTIONS');
    return {
      pageKey: getDateKey(date),
      displayName: dateSubText,
      date: date,
      pageType: 'date',
      searchText: 'prev previous last week ' + date.format('dddd') + ' ' + dateSubText
    };
  });
  return _.union(thisWeekDays, nextWeekDays, prevWeekDays);
}

export default {getDateKey, getDateSuggestionsFromNL,
  getWeekDaySuggestions, getDateSubtext, getDisplayDate, getDefaultDateSuggestions};
