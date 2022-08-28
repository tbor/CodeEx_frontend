import { http } from './http';
import { getAccessToken } from './Auth';

export interface EventData {
  eventId: number;
  eventTitle: string;
  eventDescription: string;
  coordinatorId: string;
  coordinatorEmail: string;
  coordinatorName: string;
  eventDate: Date;
  eventStatusId: number;
  eventStatus: string;
  attendees: EventRegistrationData[];
}
export interface EventDataFromServer {
  eventId: number;
  eventTitle: string;
  eventDescription: string;
  coordinatorId: string;
  coordinatorEmail: string;
  coordinatorName: string;
  eventDate: string;
  eventStatusId: number;
  eventStatus: string;
  attendees: Array<{
    eventId: number;
    attendeeId: string;
    attendeeEmail: string;
    attendeeName: string;
    requestComment: string;
    requestReply: string;
    attendeeStatusId: number;
    attendeeStatus: string;
    created: string;
  }>;
}
export interface EventRegistrationData {
  eventId: number;
  attendeeId: string;
  attendeeEmail: string;
  attendeeName: string;
  requestComment: string;
  requestReply: string;
  attendeeStatusId: number;
  attendeeStatus: string;
  created: Date;
}
export const mapEventFromServer = (event: EventDataFromServer): EventData => ({
  ...event,
  eventDate: new Date(event.eventDate),
  attendees: event.attendees
    ? event.attendees.map((registration) => ({
        ...registration,
        eventId: event.eventId,
        created: new Date(registration.created),
      }))
    : [],
});

// -----------------------------------------------------------------
//  Users
// -----------------------------------------------------------------
export interface userData {
  userId: string;
  userName: string;
  userEmail: string;
  isCoordinator: boolean;
  created: Date;
}
export interface postUserData {
  userId: string;
  userName: string;
  userEmail: string;
  isCoordinator: boolean;
}
export const mapUserFromServer = (user: userData): userData => ({
  ...user,
});

export const getUser = async (userId: string): Promise<userData | null> => {
  const accessToken = await getAccessToken();
  const result = await http<userData>({
    path: `/events/user/${userId}`,
    method: 'get',
    accessToken,
  });
  if (result.ok && result.body) {
    return mapUserFromServer(result.body);
  } else {
    return null;
  }
};

export const postUser = async (
  user: postUserData,
): Promise<userData | undefined> => {
  const result = await http<userData, postUserData>({
    path: '/events/user/update',
    method: 'post',
    body: user,
  });
  if (result.ok && result.body) {
    return mapUserFromServer(result.body);
  } else {
    return undefined;
  }
};

export const getEvent = async (eventId: number): Promise<EventData | null> => {
  const accessToken = await getAccessToken();
  const result = await http<EventDataFromServer>({
    path: `/events/${eventId}`,
    method: 'get',
    accessToken,
  });

  if (result.ok && result.body) {
    return mapEventFromServer(result.body);
  } else {
    return null;
  }
};
export const getEvents = async (): Promise<EventData[]> => {
  const result = await http<EventDataFromServer[]>({ path: '/events' });
  if (result.ok && result.body) {
    return result.body.map(mapEventFromServer);
  } else {
    return [];
  }
};

export const searchEvents = async (criteria: string): Promise<EventData[]> => {
  const accessToken = await getAccessToken();
  const result = await http<EventDataFromServer[]>({
    path: `/events?search=${criteria}`,
    method: 'get',
    accessToken,
  });
  if (result.ok && result.body) {
    return result.body.map(mapEventFromServer);
  } else {
    return [];
  }
};

export interface PostEventData {
  eventTitle: string;
  eventDescription: string;
  coordinatorId: string;
  coordinatorEmail: string;
  coordinatorName: string;
  eventDate: Date;
  eventStatusId: number;
  eventStatus: string;
}

export const postEvent = async (
  event: PostEventData,
): Promise<EventData | undefined> => {
  const accessToken = await getAccessToken();
  const result = await http<EventDataFromServer, PostEventData>({
    path: '/events/new',
    method: 'post',
    body: event,
    accessToken,
  });
  if (result.ok && result.body) {
    return mapEventFromServer(result.body);
  } else {
    return undefined;
  }
};

export interface PostRegistrationData {
  eventId: number;
  attendeeId: string;
  attendeeEmail: string;
  attendeeName: string;
  requestComment: string;
  requestReply: string;
  attendeeStatusId: number;
  attendeeStatus: string;
  registrationDate: Date;
}

// -----------------------------------------------------------------
// Registrations
// -----------------------------------------------------------------
export const mapRegistrationFromServer = (
  registration: EventRegistrationData,
): EventRegistrationData => ({ ...registration });

export const postRegistration = async (
  registration: EventRegistrationData,
): Promise<EventRegistrationData | undefined> => {
  const newRegistration: EventRegistrationData = {
    ...registration,
  };
  const accessToken = await getAccessToken();
  const result = await http<EventRegistrationData, EventRegistrationData>({
    path: '/events/registrations/new',
    method: 'post',
    body: newRegistration,
    accessToken,
  });

  if (result.ok && result.body) {
    return mapRegistrationFromServer(result.body);
  } else {
    return undefined;
  }
};

export const updateRegistration = async (
  registration: EventRegistrationData,
): Promise<EventRegistrationData | undefined> => {
  const newRegistration: EventRegistrationData = {
    ...registration,
  };
  const accessToken = await getAccessToken();
  const eventId = newRegistration.eventId;
  const result = await http<EventRegistrationData, EventRegistrationData>({
    path: `/events/${eventId}/registrations/update`,
    method: 'post',
    body: newRegistration,
    accessToken,
  });

  if (result.ok && result.body) {
    return mapRegistrationFromServer(result.body);
  } else {
    return undefined;
  }
};
