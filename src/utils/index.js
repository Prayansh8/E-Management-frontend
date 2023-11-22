import { addMonths, format, isToday, isYesterday, differenceInDays } from 'date-fns';

export const getUserTitleName = (user = {}) => {
  let postfix = "";
  let prefix = "";
  const sirMamPrefixRoles = ["teacher", "manager", "admin"];
  const studentRelatives = ["guardian", "parent"];
  if (sirMamPrefixRoles.includes(user.role)) {
    if (user.gender === "male") {
      postfix = " Sir";
    } else if (user.gender === "female") {
      postfix = " Mam";
    }
  } else if (studentRelatives.includes(user.role)) {
    if (user.gender === "male") {
      prefix = "Mr. ";
    } else if (user.gender === "female") {
      prefix = "Mrs. ";
    }
  }
  return `${prefix}${user.first_name}${postfix}`;
};

export const capitalizeFirstLetter = (string) => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return string;
};

export const snakeCaseToTitle = (snakeCaseString) => {
  return !!snakeCaseString && snakeCaseString.split("_").map(item => capitalizeFirstLetter(item)).join(" ");
};

export const getUrlPageNumber = (url) => {
  if (url === null) {
    return 0;
  }
  const splittedUrl = url.split("page=");
  if (splittedUrl.length === 2) {
    return parseInt(splittedUrl[1].split("&")[0]);
  }
  return 1;
};

export const breakPaginatedResponse = (resData) => {
  const data = resData.results;
  const totalCount = resData.count;
  const previousPage = getUrlPageNumber(resData.previous);
  return {
    data: data ? data : [],
    totalCount: totalCount ? totalCount : 0,
    previousPage,
    nextPage: previousPage + 2,
    currentPage: previousPage + 1,
  };
};

export const getCache = (key, defaultValue = "") => {
  return JSON.parse(window.localStorage.getItem(key)) || defaultValue;
};

export const setCache = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const clearCache = (key) => {
  window.localStorage.removeItem(key);
};

export const isDateToday = (dateTime) => {
  const dateFromTimestamp = new Date(dateTime);
  const currentDate = new Date();
  return !(
    dateFromTimestamp.getFullYear() !== currentDate.getFullYear() ||
    dateFromTimestamp.getMonth() !== currentDate.getMonth() ||
    dateFromTimestamp.getDate() !== currentDate.getDate()
  );
};

export const getMonthsList = (startDate, endDate) => {
  const months = [];
  let currentDate = new Date(startDate);
  while (currentDate <= new Date(endDate)) {
    months.push([format(currentDate, "yyyy-MM-01"), format(currentDate, "MMM yyyy")]);
    currentDate = addMonths(currentDate, 1);
  }
  return months;
};

export const isDateTodayYesterdayOrWeekday = (date) => {
  if (isToday(date)) {
    return 'Today';
  } else if (isYesterday(date)) {
    return 'Yesterday';
  } else {
    return `${differenceInDays(new Date(), date) + 1} days ago`;
  }  
};
