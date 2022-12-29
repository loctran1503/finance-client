export const getTimeFromDate = (date: Date): string => {
  const hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();
  return `${hours}:${minutes} hôm nay`;
};

export const formatDateToMDY = (date: Date): string => {
    const newTime = `${date.getHours()}:${date.getMinutes()}`

    const newDate = [
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
        date.getFullYear(),
      ].join("/");

      return `${newTime} ${newDate}`
};

const padTo2Digits = (num: number): string => {
  return num.toString().padStart(2, "0");
};
