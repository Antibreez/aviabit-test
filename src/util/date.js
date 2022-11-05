import { MONTHS } from "./const";

const getFullMonthByIndex = (index) => {
  return MONTHS.find((m, idx) => idx === index - 1);
};

const getLocalDate = (date) => {
  const split = new Date(date).toLocaleString().split(", ");

  return {
    date: split[0],
    time: split[1],
  };
};

const getTime = (sec) => {
  const hours = Math.floor(sec / 3600);
  const minutes = Math.ceil((sec - hours * 3600) / 60);
  const hoursText = hours > 0 ? `${hours}ч` : "";
  const minText = minutes > 0 ? `${minutes}м` : "";

  return {
    hours: hoursText,
    minutes: minText,
  };
};

const getTimeText = (sec) => {
  const result = getTime(sec);
  return `${result.hours} ${result.minutes}`;
};

export { getFullMonthByIndex, getLocalDate, getTime, getTimeText };
