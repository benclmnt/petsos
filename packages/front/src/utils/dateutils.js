export function toJSONLocal(date) {
  if (!date) {
    console.error('DATE IS UNUSABLE BOOOO!');
    return;
  }
  date = new Date(date);
  var local = date;
  local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return local.toJSON().substring(0, 10);
}
