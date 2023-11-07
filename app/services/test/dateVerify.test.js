import dataVerifyService from '../dateVerify.service.js';

describe('removeDuplicateDates', () => {
  it('should remove duplicate dates from the input object', () => {
    const datesOfEvent = {
      date1: {
        startDate: '2023-11-01T10:00:00+01:00',
        endDate: '2023-11-01T16:00:00+01:00',
      },
      date2: {
        startDate: '2023-11-02T10:00:00+01:00',
        endDate: '2023-11-01T16:00:00+01:00',
      },
      date3: {
        startDate: '2023-11-02T10:00:00+01:00',
        endDate: '2023-11-01T16:00:00+01:00',
      },
    };

    const expected = {
      date1: {
        start_date: '2023-11-01T10:00:00+01:00',
        end_date: '2023-11-01T16:00:00+01:00',
      },
      date2: {
        start_date: '2023-11-02T10:00:00+01:00',
        end_date: '2023-11-01T16:00:00+01:00',
      },
    };

    const result = dataVerifyService.removeDuplicateDates(datesOfEvent);
    expect(result).toEqual(expected);
  });

  it('should handle an empty input object', () => {
    const datesOfEvent = {};
    const expected = {};

    const result = dataVerifyService.removeDuplicateDates(datesOfEvent);
    expect(result).toEqual(expected);
  });

  it('should handle an input object with no duplicates', () => {
    const datesOfEvent = {
      date1: {
        startDate: '2023-11-01T10:00:00+01:00',
        endDate: '2023-11-01T16:00:00+01:00',
      },
      date2: {
        startDate: '2023-11-02T10:00:00+01:00',
        endDate: '2023-11-01T16:00:00+01:00',
      },
    };

    const expected = {
      date1: {
        start_date: '2023-11-01T10:00:00+01:00',
        end_date: '2023-11-01T16:00:00+01:00',
      },
      date2: {
        start_date: '2023-11-02T10:00:00+01:00',
        end_date: '2023-11-01T16:00:00+01:00',
      },
    };

    const result = dataVerifyService.removeDuplicateDates(datesOfEvent);
    expect(result).toEqual(expected);
  });
});
