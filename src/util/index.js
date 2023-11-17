export function formatDate(timestamp) {
  var currentDate = new Date();
  var inputDate = new Date(timestamp);
  
  var currentYear = currentDate.getFullYear();
  var inputYear = inputDate.getFullYear();
  
  var currentMonth = padZero(currentDate.getMonth() + 1);
  var inputMonth = padZero(inputDate.getMonth() + 1);
  
  var currentDay = padZero(currentDate.getDate());
  var inputDay = padZero(inputDate.getDate());
  
  if (currentYear === inputYear) {
    if (currentMonth === inputMonth && currentDay === inputDay) {
      return "今天";
    } else if (currentMonth === inputMonth && currentDay - inputDay === 1) {
      return "昨天";
    } else {
      return inputMonth + "/" + inputDay;
    }
  } else {
    return inputYear + "/" + inputMonth + "/" + inputDay;
  }
}

function padZero(number) {
  return number < 10 ? "0" + number : number;
}
