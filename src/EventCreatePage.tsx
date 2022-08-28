import React from 'react';
import { Page } from './Page';
import {
  Fieldset,
  FieldContainer,
  FieldLabel,
  FieldInput,
  FormButtonContainer,
  PrimaryButton,
  FieldError,
  SubmissionSuccess,
  SubmissionFailure,
} from './Styles';
import { postEvent } from './EventData';
import { useForm } from 'react-hook-form';
import { useAuth } from './Auth';

type FormData = {
  EventTitle: string;
  EventDescription: string;
  CoordinatorName: string;
  EventDate: Date;
};

export const EventCreatePage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    formState,
  } = useForm<FormData>({
    mode: 'onBlur',
  });
  const { user } = useAuth();
  const [successfullySubmitted, setSuccessfullySubmitted] =
    React.useState(false);
  const [submissionFailed, setSubmissionFailed] = React.useState(false);

  const submitForm = async (data: FormData) => {
    const result = await postEvent({
      eventTitle: data.EventTitle,
      eventDescription: data.EventDescription,

      coordinatorId:
        user?.sub === undefined || user?.sub === null ? '' : user.sub,
      coordinatorEmail:
        user?.email === undefined || user?.email === null ? '' : user.email,
      coordinatorName:
        user?.name === undefined || user?.name === null ? '' : user.name,
      eventDate: data.EventDate,
      eventStatusId: 1,
      eventStatus: '',
    });
    //---------------------------------------------
    setSuccessfullySubmitted(result ? true : false);
    setSubmissionFailed(result ? false : true);
  };
  const { isAuthenticated, isCoordinator } = useAuth();
  return (
    <Page title="Create Event">
      {isAuthenticated && isCoordinator && (
        <form onSubmit={handleSubmit(submitForm)}>
          <Fieldset disabled={formState.isSubmitting || successfullySubmitted}>
            <FieldContainer>
              <FieldLabel htmlFor="EventTitle">Event Title</FieldLabel>
              <FieldInput
                id="EventTitle"
                {...register('EventTitle', { required: true })}
                type="text"
              />
              {errors.EventTitle && errors.EventTitle.type === 'required' && (
                <FieldError>You must enter the event title</FieldError>
              )}
            </FieldContainer>
            <FieldContainer>
              <FieldLabel htmlFor="EventDescription">
                Event Description
              </FieldLabel>
              <FieldInput
                id="EventDescription"
                {...register('EventDescription', { required: true })}
                type="text"
              />
              {errors.EventDescription &&
                errors.EventDescription.type === 'required' && (
                  <FieldError>You must enter the event description</FieldError>
                )}
            </FieldContainer>
            <FieldContainer>
              <FieldLabel htmlFor="EventDate">Event Date</FieldLabel>
              <FieldInput
                id="EventDate"
                {...register('EventDate', { required: true })}
                type="datetime-local"
              />
              {errors.EventDate && errors.EventDate.type === 'required' && (
                <FieldError>You must enter the event date</FieldError>
              )}
            </FieldContainer>
            <FormButtonContainer>
              <PrimaryButton type="submit">Submit the Event</PrimaryButton>
            </FormButtonContainer>
            {successfullySubmitted && (
              <SubmissionSuccess>
                Your event was successfully submitted.
              </SubmissionSuccess>
            )}
            {submissionFailed && (
              <SubmissionFailure>
                Unable to submit event at this time. Please try again later.
              </SubmissionFailure>
            )}
          </Fieldset>
        </form>
      )}
    </Page>
  );
};
export default EventCreatePage;
