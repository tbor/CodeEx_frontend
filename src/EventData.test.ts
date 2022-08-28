import { mapEventFromServer } from './EventData';

test('When mapEventFromServer is called with question, created should be turned into a Date', () => {
  const result = mapEventFromServer({
    eventId: 1,
    eventTitle: 'TypeScript Class',
    eventDescription:
      'TypeScript seems to be getting popular. What benefits does it give over JavaScript?',
    coordinatorId: 'auth0|hubbahubbahubba',
    coordinatorName: 'Frank Zippos',
    coordinatorEmail: 'haskelld@seattleu.edu',
    eventDate: '2023-01-01T00:00:00.000Z',
    eventStatusId: 1,
    eventStatus: 'foo',
    attendees: [],
  });
  expect(result).toEqual({
    eventId: 1,
    eventTitle: 'TypeScript Class',
    eventDescription:
      'TypeScript seems to be getting popular. What benefits does it give over JavaScript?',
    coordinatorId: 'auth0|hubbahubbahubba',
    coordinatorName: 'Frank Zippos',
    coordinatorEmail: 'haskelld@seattleu.edu',
    eventDate: new Date(Date.UTC(2023, 0, 1, 0, 0, 0, 0)),
    eventStatusId: 1,
    eventStatus: 'foo',
    attendees: [],
  });
});

test('When mapEventFromServer is called with question and answers, created should be turned into a Date', () => {
  const result = mapEventFromServer({
    eventId: 1,
    eventTitle: 'TypeScript Class',
    eventDescription:
      'TypeScript seems to be getting popular. What benefits does it give over JavaScript?',
    coordinatorId: 'auth0|hubbahubbahubba',
    coordinatorName: 'Frank Zippos',
    coordinatorEmail: 'haskelld@seattleu.edu',
    eventDate: '2023-01-01T00:00:00.000Z',
    eventStatusId: 1,
    eventStatus: 'foo',
    attendees: [
      {
        eventId: 1,
        attendeeId: 'auth0|ungabungabungabinga',
        attendeeEmail: 'haskelld@tutanota.com',
        attendeeName: 'Jane',
        attendeeStatusId: 2,
        attendeeStatus: 'Rejected',
        requestComment: 'can I participate',
        requestReply: 'no',
        created: '2022-01-01T00:00:00.000Z',
      },
    ],
  });

  expect(result).toEqual({
    eventId: 1,
    eventTitle: 'TypeScript Class',
    eventDescription:
      'TypeScript seems to be getting popular. What benefits does it give over JavaScript?',
    coordinatorId: 'auth0|hubbahubbahubba',
    coordinatorName: 'Frank Zippos',
    coordinatorEmail: 'haskelld@seattleu.edu',
    eventDate: new Date(Date.UTC(2023, 0, 1, 0, 0, 0, 0)),
    eventStatusId: 1,
    eventStatus: 'foo',
    attendees: [
      {
        eventId: 1,
        attendeeId: 'auth0|ungabungabungabinga',
        attendeeEmail: 'haskelld@tutanota.com',
        attendeeName: 'Jane',
        attendeeStatusId: 2,
        attendeeStatus: 'Rejected',
        requestComment: 'can I participate',
        requestReply: 'no',
        created: new Date(Date.UTC(2022, 0, 1, 0, 0, 0, 0)),
      },
    ],
  });
});
