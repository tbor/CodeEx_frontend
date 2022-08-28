import {
  Store,
  legacy_createStore as createStore,
  combineReducers,
} from 'redux';
import { EventData } from './EventData';

interface EventsState {
  readonly loading: boolean;
  readonly viewing: EventData | null;
  readonly searched: EventData[];
}

export interface AppState {
  readonly events: EventsState;
}

const initialEventsState: EventsState = {
  loading: false,
  viewing: null,
  searched: [],
};

export const GETTINGEVENT = 'GettingEvent';
export const gettingEventAction = () =>
  ({
    type: GETTINGEVENT,
  } as const);

export const GOTEVENT = 'GotEvent';
export const gotEventAction = (event: EventData | null) =>
  ({
    type: GOTEVENT,
    event: event,
  } as const);

export const GETTINGEVENTS = 'GettingEvents';
export const gettingEventsAction = () =>
  ({
    type: GETTINGEVENTS,
  } as const);

export const GOTEVENTS = 'GotEvents';
export const gotEventsAction = (events: EventData[]) =>
  ({
    type: GOTEVENTS,
    events,
  } as const);

export const SEARCHINGEVENTS = 'SearchingEvents';

export const searchingEventsAction = () =>
  ({
    type: SEARCHINGEVENTS,
  } as const);

export const SEARCHEDEVENTS = 'SearchedEvents';
export const searchedEventsAction = (events: EventData[]) =>
  ({
    type: SEARCHEDEVENTS,
    events,
  } as const);

type EventsActions =
  | ReturnType<typeof gettingEventAction>
  | ReturnType<typeof gotEventAction>
  | ReturnType<typeof gettingEventsAction>
  | ReturnType<typeof gotEventsAction>
  | ReturnType<typeof searchingEventsAction>
  | ReturnType<typeof searchedEventsAction>;

const eventsReducer = (
  state = initialEventsState,

  action: EventsActions,
) => {
  switch (action.type) {
    case GETTINGEVENT: {
      return {
        ...state,
        viewing: null,
        loading: true,
      };
    }

    case GOTEVENT: {
      return {
        ...state,
        viewing: action.event,
        loading: false,
      };
    }
    case GETTINGEVENTS: {
      return {
        ...state,
        searched: [],
        loading: true,
      };
    }

    case GOTEVENTS: {
      return {
        ...state,
        searched: action.events,
        loading: false,
      };
    }

    case SEARCHINGEVENTS: {
      return {
        ...state,
        searched: [],
        loading: true,
      };
    }

    case SEARCHEDEVENTS: {
      return {
        ...state,
        searched: action.events,
        loading: false,
      };
    }
  }

  return state;
};

//=============================================================================================
//  Root Reducer
//=============================================================================================
const rootReducer = combineReducers<AppState>({
  events: eventsReducer,
});

export function configureStore(): Store<AppState> {
  const store = createStore(rootReducer, undefined);
  return store;
}
