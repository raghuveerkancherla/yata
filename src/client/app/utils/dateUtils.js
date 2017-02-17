import moment from 'moment';
import chrono from 'chrono-node';


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

export default {getDateKey, getDisplayDate, getDateFromNL};
