export const convertDateFormatToDisplay = (dateString: string) => {
  const standardDatePattern = /^\d{4}-\d{2}-\d{2}$/;

  if (standardDatePattern.test(dateString)) {
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  }

  return dateString;
};
