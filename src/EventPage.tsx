/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, gettingEventAction, gotEventAction } from './Store';
import {
  gray3,
  gray6,
  Fieldset,
  FieldContainer,
  FieldLabel,
  FieldInput,
  FormButtonContainer,
  PrimaryButton,
  SubmissionSuccess,
} from './Styles';

import { getEvent, postRegistration } from './EventData';

import React from 'react';
import { Page } from './Page';
import { useParams } from 'react-router-dom';
import { AttendeeList } from './AttendeeList';

import { useAuth } from './Auth';

type FormData = {
  requestComment: string;
};

export const EventPage = () => {
  const dispatch = useDispatch();
  const event = useSelector((state: AppState) => state.events.viewing);
  const { eventId } = useParams();
  const [successfullySubmitted, setSuccessfullySubmitted] =
    React.useState(false);
  const { user } = useAuth();

  React.useEffect(() => {
    const doGetEvent = async (eventId: number) => {
      dispatch(gettingEventAction());
      const foundEvent = await getEvent(eventId);
      dispatch(gotEventAction(foundEvent));
    };

    if (eventId) {
      doGetEvent(Number(eventId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    formState,
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  // -----------------------------------------------------------------------------
  //  check if user coordinator or attendee
  // -----------------------------------------------------------------------------
  const isEventCoordinator = user?.sub === event?.coordinatorId ? true : false;
  const sUserId = user?.sub === undefined ? '' : user.sub;

  const thisAttendee = event?.attendees.filter((Attendee) => {
    return Attendee.attendeeId === sUserId;
  });
  const isAttendee =
    thisAttendee === undefined || thisAttendee.length === 0 ? false : true;
  // -----------------------------------------------------------------------------

  const submitRegistrationForm = async (data: FormData) => {
    const result = await postRegistration({
      eventId: event!.eventId,
      attendeeId: user?.sub === null || user?.sub === undefined ? '' : user.sub,
      attendeeEmail:
        user?.email === null || user?.email === undefined ? '' : user.email,
      attendeeName:
        user?.name === null || user?.name === undefined ? '' : user.name,
      requestComment: data.requestComment,
      requestReply: '',
      attendeeStatusId: 1,
      attendeeStatus: 'Registered',
      created: new Date(),
    });

    setSuccessfullySubmitted(result ? true : false);
  };
  return (
    <Page>
      <div
        css={css`
          background-color: white;
          padding: 15px 20px 20px 20px;
          border-radius: 4px;
          border: 1px solid ${gray6};
          box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
        `}
      >
        <div
          css={css`
            font-size: 28px;
            font-weight: bold;
            margin: 10px 0px 5px;
          `}
        >
          {event === null ? '' : event.eventTitle}
        </div>
        {event !== null && (
          <React.Fragment>
            <p
              css={css`
                margin-top: 0px;
                background-color: white;
              `}
            >
              {event.eventDescription}
            </p>
            <div
              css={css`
                font-size: 12px;
                font-style: italic;
                color: ${gray3};
              `}
            >
              {`Coordinated by ${event.coordinatorName}`}
              <br />
              {`Scheduled on ${event.eventDate.toLocaleDateString()}`}
            </div>
            {event.attendees === null || !isEventCoordinator ? (
              !isAttendee ? (
                ``
              ) : (
                <div>
                  {thisAttendee?.map((Attendee) => {
                    return (
                      <div key={Attendee.attendeeId}>
                        <h3>
                          Status for {Attendee.attendeeName}:{' '}
                          {Attendee.attendeeStatus}
                        </h3>
                        <div>Your comment: {Attendee.requestComment}</div>
                        <div>Coordinator reply: {Attendee.requestReply}</div>
                      </div>
                    );
                  })}
                </div>
              )
            ) : (
              <AttendeeList data={event.attendees} />
            )}

            {!isEventCoordinator && !isAttendee && (
              <form
                id="frmRegistration"
                onSubmit={handleSubmit(submitRegistrationForm)}
                css={css`
                  margin-top: 20px;
                `}
              >
                <Fieldset
                  disabled={formState.isSubmitting || successfullySubmitted}
                >
                  <FieldContainer>
                    <FieldLabel htmlFor="requestComment">Comment</FieldLabel>
                    <FieldInput
                      id="requestComment"
                      {...register('requestComment')}
                    />
                  </FieldContainer>
                  <FormButtonContainer>
                    <PrimaryButton type="submit">Register</PrimaryButton>
                  </FormButtonContainer>
                  {successfullySubmitted && (
                    <SubmissionSuccess>
                      Your registration request was successfully submitted
                    </SubmissionSuccess>
                  )}
                </Fieldset>
              </form>
            )}
          </React.Fragment>
        )}
      </div>
    </Page>
  );
};
