import moment from 'moment-timezone';

export const offsetTimesToGMTZero = (times: Array<string>, timezone: string): Array<string> => {
  const gmtZeroOffset = moment.tz("GMT+0").utcOffset();

  return times.map((time) => {
    const datetime = moment.tz(`${moment().format("YYYY-MM-DD")} ${time}`, timezone);
    const offsetted = datetime.utcOffset(gmtZeroOffset);

    return offsetted.format("HH:mm");
  });
}