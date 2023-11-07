export default {
  removeDuplicateDates(datesOfEvent) {
    const uniqueDates = new Set();
    const result = {};

    Object.keys(datesOfEvent).forEach((dateKey) => {
      const date = datesOfEvent[dateKey];
      const { startDate, endDate } = date;
      const datePair = `${startDate}-${endDate}`;

      if (!uniqueDates.has(datePair)) {
        uniqueDates.add(datePair);
        result[dateKey] = {
          start_date: startDate,
          end_date: endDate,
        };
      }
    });
    return result;
  },
};
