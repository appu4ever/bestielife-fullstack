export function formatDate(inputDate: Date, options: string = ''): string {
  let month = '' + (inputDate.getMonth() + 1),
    day = '' + inputDate.getDate(),
    year = inputDate.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  if (options) {
    return [month, day, year].join('/');
  } else {
    return [month, year].join('/');
  }
}
