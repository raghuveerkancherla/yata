import moment from 'moment';
import chrono from 'chrono-node';
import _ from 'lodash';


function getDisplayDate(date) {
  const today = moment();

  const days_delta = date.diff(today, 'days', true);
  if (-2 < days_delta && days_delta <= -1) {
    return 'yesterday';
  } else if (-1 < days_delta && days_delta < 0.9) {
    return 'today';
  } else if (0.9 < days_delta && days_delta < 1.9) {
    return 'tomorrow';
  } else {
    return date.format("ddd, MMM Do");
  }
}

function getDateKey(date) {
  return date.format("YYYY/MM/DD");
}

function getDateFromNL(userInput){
  var date = chrono.parseDate(userInput);
  return date != null ? moment(date) : null;
}

function getWeekDaySuggestions(){
  var nextMondayDate = new Date();
  nextMondayDate.setDate(nextMondayDate.getDate() + (7-nextMondayDate.getDay())%7+1);
  var nextMonday = moment(nextMondayDate);

  var nextWeekDays = _.map(_.range(0,7,1), function (delta) {
    var date = nextMonday.clone();
    date.add(delta, 'days');
    return {
      pageKey: getDateKey(date),
      displayName: 'Next '.concat(date.format('dddd')),
      date: date,
      pageType: 'date'
    };
  });
  var prevWeekDays = _.map(_.range(1,8,1), function (delta) {
    var date = nextMonday.clone();
    date.add(-1*delta, 'days');

    return {
      pageKey: getDateKey(date),
      displayName: 'Prev '.concat(date.format('dddd')),
      date: date
    };
  });

  return _.union(nextWeekDays, prevWeekDays);
}

export default {getDateKey, getDateFromNL, getWeekDaySuggestions, getDisplayDate};
