/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useSearchParams } from 'react-router-dom';
import { EventList } from './EventList';
import { searchEvents } from './EventData';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, searchingEventsAction, searchedEventsAction } from './Store';

import React from 'react';
import { Page } from './Page';
export const SearchPage = () => {
  const dispatch = useDispatch();
  const events = useSelector((state: AppState) => state.events.searched);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('criteria') || '';
  React.useEffect(() => {
    const doSearch = async (criteria: string) => {
      dispatch(searchingEventsAction());
      const foundResults = await searchEvents(criteria);
      dispatch(searchedEventsAction(foundResults));
    };
    doSearch(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  return (
    <Page title="Search Results">
      {search && (
        <p
          css={css`
            font-size: 16px;
            font-style: italic;
            margin-top: 0px;
          `}
        ></p>
      )}
      <EventList data={events} />
    </Page>
  );
};
