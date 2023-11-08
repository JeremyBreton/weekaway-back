import userChoiceVerify from '../userChoiceVerify.service.js';

describe('userChoiceVerify', () => {
  it('should return true if the user has already voted for this date on this event', () => {
    const data = {
      startDate: '2021-05-21T00:00:00.000Z',
      endDate: '2021-05-21T00:00:00.000Z',
      eventId: 1,
      userId: 1,
    };
    const userChoiceData = [
      {
        event_id: 1,
        start_date_choice: '2021-05-21T00:00:00.000Z',
        end_date_choice: '2021-05-21T00:00:00.000Z',
      },
    ];
    const hasVoted = userChoiceVerify.removeDuplicateDatesForEvent(data, userChoiceData);
    expect(hasVoted).toBe(true);
  });
});
