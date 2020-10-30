export function toJSONLocal(date) {
  if (!date) {
    console.error("DATE IS UNUSABLE BOOOO!");
    return;
  }
  var local = date;
  local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  console.log(date, local);
  return local.toJSON().substring(0, 10);
}
