const dateFormat_TH = () => {
  const new_date = new Date();
  const date_utc = Date.UTC(
    new_date.getUTCFullYear(),
    new_date.getUTCMonth(),
    new_date.getUTCDate(),
    new_date.getUTCHours(),
    new_date.getUTCMinutes(),
    new_date.getUTCSeconds()
  );
  const new_date_utc = new Date(date_utc);
  new_date_utc.setHours(new_date_utc.getHours() + 7);

  const date_isoString = new_date_utc.toISOString();
  const date_dateOnly = date_isoString.split("T")[0];
  const date_timeOnly = date_isoString.split("T")[1];

  return {
    date_isoString,
    date_dateOnly,
    date_timeOnly,
  };
};

module.exports = {
  dateFormat_TH,
};
