export const convertTo12HourFormat = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  const ampm = hours >= 12 ? "PM" : "AM";

  // Return formatted time
  return `${hours % 12 || 12}:${minutes < 10 ? "0" + minutes : minutes}${ampm}`;
};
