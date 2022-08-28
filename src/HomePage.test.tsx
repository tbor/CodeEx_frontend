import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { HomePage } from './HomePage';
import { BrowserRouter } from 'react-router-dom';
afterEach(cleanup);

jest.mock('./EventData', () => ({
  getEvents: () => {
    return Promise.resolve([
      {
        eventId: 1,
        eventTitle: 'Title1 test',
        eventDescription: 'Description1 test',
        coordinatorId: 'coordinatorId1 test',
        coordinatorName: 'Name1 test',
        coordinatorEmail: 'email1@test.com',
        eventDate: new Date(2023, 1, 1),
        eventStatusId: 1,
        eventStatus: 'status1 test',
        attendees: [],
      },
      {
        eventId: 2,
        eventTitle: 'Title2 test',
        eventDescription: 'Description2 test',
        coordinatorId: 'coordinatorId2 test',
        coordinatorName: 'Name2 test',
        coordinatorEmail: 'email2@test.com',
        eventDate: new Date(2024, 1, 1),
        eventStatusId: 2,
        eventStatus: 'status2 test',
        attendees: [],
      },
    ]);
  },
}));

test('When HomePage first rendered, loading indicator should show', async () => {
  const { findByText } = render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>,
  );
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const loading = await findByText('Loading...');
  expect(loading).not.toBeNull();
});

test('When HomePage data returned, it should render questions', async () => {
  const { findByText } = render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>,
  );
  // eslint-disable-next-line testing-library/prefer-screen-queries
  expect(await findByText('Title1 test')).toBeInTheDocument();
  // eslint-disable-next-line testing-library/prefer-screen-queries
  expect(await findByText('Title2 test')).toBeInTheDocument();
});
