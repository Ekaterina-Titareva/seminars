export const convertDateFormatToInput = (dateString: string) => {
  const datePattern = /^\d{2}\.\d{2}\.\d{4}$/;

  if (datePattern.test(dateString)) {
    const [day, month, year] = dateString.split(".");
    return `${year}-${month}-${day}`;
  }
  return dateString;
};
