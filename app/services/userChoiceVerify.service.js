export default {
  removeDuplicateDatesForEvent(data, userChoiceData) {
    let hasVoted = false;

    userChoiceData.forEach((element) => {
      if (element.event_id === data.eventId) {
        const elementStartDate = new Date(element.start_date_choice);
        const elementEndDate = new Date(element.end_date_choice);
        const inputStartDate = new Date(data.startDate);
        const inputEndDate = new Date(data.endDate);

        if (
          elementStartDate.getTime() === inputStartDate.getTime()
          && elementEndDate.getTime() === inputEndDate.getTime()) {
          hasVoted = true;
        }
      }
    });
    return hasVoted;
  },
};
