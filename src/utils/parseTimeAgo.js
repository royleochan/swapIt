const parseTimeAgo = (createdAt) => {
  const currentDateTime = new Date();
  const createdDateTime = new Date(createdAt);
  const msPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds per day
  let daysLeft =
    (currentDateTime.getTime() - createdDateTime.getTime()) / msPerDay;
  daysLeft = Math.round(daysLeft);

  if (daysLeft <= 30) {
    return `${daysLeft} ${daysLeft === 1 ? "day" : "days"} ago`;
  } else if (daysLeft <= 365) {
    const numMonths = Math.floor(daysLeft / 30);
    return `${numMonths} ${numMonths === 1 ? "month" : "months"} ago`;
  } else {
    const numYears = Math.floor(daysLeft / 365);

    return `${numYears} ${numYears === 1 ? "year" : "years"} ago`;
  }
};

export default parseTimeAgo;
