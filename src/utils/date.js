const parseDateToYYYYMMDD = (date) => {
  return new Date(date).toLocaleDateString("en-ZA");
};

export default parseDateToYYYYMMDD;
