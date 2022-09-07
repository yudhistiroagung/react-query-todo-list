export const delay = (duration = 1000) => new Promise(res => {
  setTimeout(res, duration);
});