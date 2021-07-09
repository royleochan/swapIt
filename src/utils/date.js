/**
 * Parses date to YYYYMMDD format
 *
 * @param date: string in mongoDB date format
 * @returns string representing date in YYYYMMDD
 */
const parseDateToYYYYMMDD = (date) => {
  return new Date(date).toLocaleDateString("en-ZA");
};

/**
 * Parses date to string indicating how much time ago from createdAt
 * For example: 1 day ago or 3 minutes ago
 *
 * @param createdAt: string in mongoDB date format
 * @returns string indicating how much time ago from createdAt
 */
const parseTimeAgo = (createdAt) => {
  let currentDateTime = new Date();
  let createdDateTime = new Date(createdAt);
  let d = Math.abs(currentDateTime - createdDateTime) / 1000;
  let r = {};
  let s = {
    year: 31536000,
    month: 2592000,
    week: 604800, // uncomment row to ignore
    day: 86400, // feel free to add your own row
    hour: 3600,
    minute: 60,
    second: 1,
  };

  Object.keys(s).forEach(function (key) {
    r[key] = Math.floor(d / s[key]);
    d -= r[key] * s[key];
  });

  // for example: {year:0,month:0,week:1,day:2,hour:34,minute:56,second:7}
  const { year, month, week, day, hour, minute, second } = r;
  if (year >= 1) {
    return `${year} ${year === 1 ? "year" : "years"} ago`;
  } else if (month >= 1) {
    return `${month} ${month === 1 ? "month" : "months"} ago`;
  } else if (week >= 1) {
    return `${week} ${week === 1 ? "week" : "weeks"} ago`;
  } else if (day >= 1) {
    return `${day} ${day === 1 ? "day" : "days"} ago`;
  } else if (hour >= 1) {
    return `${hour} ${hour === 1 ? "hour" : "hours"} ago`;
  } else if (minute >= 1) {
    return `${minute} ${minute === 1 ? "minute" : "minutes"} ago`;
  } else {
    return `${second} ${second === 1 ? "second" : "seconds"} ago`;
  }
};

export { parseDateToYYYYMMDD, parseTimeAgo };
