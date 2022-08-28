/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { PrimaryButton } from './Styles';
import React from 'react';
import { EventList } from './EventList';
import { getEvents, EventData } from './EventData';
import { Page } from './Page';
import { PageTitle } from './PageTitle';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';

export const HomePage = () => {
  const [events, setEvents] = React.useState<EventData[]>([]);
  const [eventsLoading, setEventsLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    const doGetEvents = async () => {
      console.log('Get events...');
      const eventsSchedule = await getEvents();

      if (!cancelled) {
        setEvents(eventsSchedule);
        setEventsLoading(false);
      }
    };
    doGetEvents();
  }, []);
  const navigate = useNavigate();
  const handleEventCreateClick = () => {
    navigate('EventCreate');
  };

  const { isAuthenticated, isCoordinator } = useAuth();
  return (
    <Page>
      <div>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
          `}
        >
          <PageTitle>All Events</PageTitle>
          {isAuthenticated && isCoordinator && (
            <PrimaryButton onClick={handleEventCreateClick}>
              Create Event
            </PrimaryButton>
          )}
        </div>
        {eventsLoading ? (
          <div>Loading…</div>
        ) : events.length > 0 ? (
          <EventList data={events} />
        ) : (
          <div
            css={css`
              padding-top: 50px;
              font-size: 18px;
              font-weight: normal;
              font-style: italic;
              color: gray2;
            `}
          >
            Event data is not available.
          </div>
        )}
      </div>
    </Page>
  );
};
