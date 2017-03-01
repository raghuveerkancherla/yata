import moment from 'moment';


function getDefaultDateSubText(date) {
  const today = moment();

  const days_delta = date.diff(today, 'days', true);
  if (-2 < days_delta && days_delta <= -1) {
    return 'yesterday';
  } else if (-1 < days_delta && days_delta < 0.9) {
    return 'today';
  } else if (0.9 < days_delta && days_delta < 1.9) {
    return 'tomorrow';
  } else {
    return null;
  }
}

function getSearchSuggestionSubText(date){
  const today = moment();
  const dateIsThisWeek = date.week() == today.week();
  const dateIsNextWeek = date.week() - today.week() == 1;
  const dateIsLastWeek = date.week() - today.week() == -1;
  const dateInFuture = date.diff(today, 'days') > 0;
  const dateInPast = date.diff(today, 'days') < 0;
  var subText = getDefaultDateSubText(date);

  if (subText == null){
    if (dateIsThisWeek && dateInFuture) {
      subText = date.format('dddd');
    } else if (dateIsThisWeek && dateInPast ) {
      subText = 'This week ' + date.format('dddd');
    } else if (dateIsNextWeek) {
      subText = 'Next week ' + date.format('dddd');
    } else if (dateIsLastWeek) {
      subText = 'Last week ' + date.format('dddd');
    }
  }
  return subText;
}

function getDateSubtext(date, context) {
  switch (context) {
    case 'DATE':
      return null;
    case 'SEARCH_SUGGESTIONS':
      return getSearchSuggestionSubText(date);
    default:
      return getDefaultDateSubText(date);
  }
}

export default getDateSubtext;
