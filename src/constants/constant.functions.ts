import * as moment from 'moment';

export function getCurrentFormattedDate() {
  return moment().format('MM-DD-YYYY');
}

export function getCurrentFormattedDateTime() {
  const date = moment().format('MM-DD-YYYY');
  const time = moment().format('HH:mm');
  return {date, time};
}