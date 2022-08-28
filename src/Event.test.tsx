/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { EventData } from './EventData';
import { Event } from './Event';
import { BrowserRouter } from 'react-router-dom';
afterEach(cleanup);
test('When the Event component is rendered, it should contain the correct data', () => {
  const event: EventData = {
    eventId: 1,
    eventTitle: 'TypeScript Class',
    eventDescription: 'TypeScript seems to be getting popular',
    coordinatorId: 'auth0|hubbahubbahubba',
    coordinatorName: 'Frank Zippos',
    coordinatorEmail: 'haskelld@seattleu.edu',
    eventDate: new Date(2023, 1, 1),
    eventStatusId: 1,
    eventStatus: 'foo',
    attendees: [],
  };
  const { queryByText } = render(
    <BrowserRouter>
      <Event data={event} />
    </BrowserRouter>,
  );

  const titleText = queryByText('TypeScript Class');
  expect(titleText).not.toBeNull();

  const eventDescriptionText = queryByText(
    'TypeScript seems to be getting popular',
  );
  expect(eventDescriptionText).not.toBeNull();

  const coordinatorNameText = queryByText(/Zippo/);
  expect(coordinatorNameText).not.toBeNull();

  const dateText = queryByText(/2023/);
  expect(dateText).not.toBeNull();
});
