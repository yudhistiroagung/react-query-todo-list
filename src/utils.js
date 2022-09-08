import dayjs from 'dayjs';

export const delay = (duration = 1000) => new Promise(res => {
  setTimeout(res, duration);
});

export const toSimpleDate = (dateString) => {
  return dayjs(dateString).format('DD-MM-YYYY');
};