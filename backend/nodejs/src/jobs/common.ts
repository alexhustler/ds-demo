import moment from "moment";

export const isCurrentTimeInInterval = (
  startHoursUtc: number,
  startMinutesUtc: number,
  stopHoursUtc: number,
  stopMinutesUtc: number
): boolean => {
  const now = moment().utc();
  return !(
    now.hours() < startHoursUtc ||
    now.hours() > stopHoursUtc ||
    (now.hours() === startHoursUtc && now.minutes() < startMinutesUtc) ||
    (now.hours() === stopHoursUtc && now.minutes() > stopMinutesUtc)
  );
};
