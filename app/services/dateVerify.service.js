export default {
  async removeDuplicateDates(datesOfEvent) {
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

/*
      datesOfEvent : {
        DATEKEY :
        {
        startDate: 15/08/2024,
        endDate: 16/08/2013,

        },
        date :
        {
        startDate: 15/08/2024,
        endDate: 16/08/2013,
        id: 2,
        },
        date :
        {
        startDate: 15/08/2024,
        endDate: 17/08/2013,
        id: 3,
        },
        date :
        {
        startDate: 15/08/2024,
        endDate: 18/08/2013,
        id: 4,
        },
        date :
        {
        startDate: timestamps,
        endDate: timestamps,
        id: 5,
        },
      };

    */
