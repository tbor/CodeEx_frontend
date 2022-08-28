/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { EventRegistrationData, updateRegistration } from './EventData';
import {
  gray3,
  gray5,
  ComboBox,
  SubmissionSuccess,
  FieldInput,
  FieldContainer,
  FieldLabel,
  FormButtonContainer,
  PrimaryButton,
} from './Styles';
import { useForm } from 'react-hook-form';

interface Props {
  data: EventRegistrationData;
}

type FormData = {
  attendeeStatusId: number;
  attendeeStatus: string;
  requestReply: string;
};

export interface AttendeeStatusData {
  attendeeStatusId: number;
  attendeeStatus: string;
}
const status: AttendeeStatusData[] = [
  { attendeeStatusId: 1, attendeeStatus: 'Registered' },
  { attendeeStatusId: 2, attendeeStatus: 'Rejected' },
  { attendeeStatusId: 3, attendeeStatus: 'Authorized' },
  { attendeeStatusId: 4, attendeeStatus: 'Attended' },
  { attendeeStatusId: 5, attendeeStatus: 'Absent' },
];

export const Attendee = ({ data }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    formState,
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const [successfullySubmitted, setSuccessfullySubmitted] =
    React.useState(false);

  const submitAttendeeUpdateForm = async (dataX: FormData) => {
    const result = await updateRegistration({
      eventId: data.eventId,
      attendeeId: data.attendeeId,
      attendeeEmail: data.attendeeEmail,
      attendeeName: data.attendeeName,
      requestComment: data.requestComment,
      requestReply: dataX.requestReply,
      attendeeStatusId: dataX.attendeeStatusId,
      attendeeStatus: '',
      created: new Date(),
    });

    setSuccessfullySubmitted(result ? true : false);
  };

  return (
    <form onSubmit={handleSubmit(submitAttendeeUpdateForm)}>
      <div
        css={css`
          padding: 0 0 0 0;
          margin: 0, 0, 0, 0;
        `}
      >
        <div
          css={css`
            padding-top: 20px;
            padding-bottom: 0px;
            font-size: 18px;
            font-weight: bold;
            margin: 0;
          `}
        >
          {`${data.attendeeName}`}
        </div>

        <div
          css={css`
            padding: 0;
            font-size: 13px;
            margin: 0;
          `}
        >
          <br />
          {`registered on ${data.created.toLocaleDateString()}`}
        </div>

        <div
          css={css`
            padding-top: 20px;
            font-size: 12px;
            font-style: italic;
            color: ${gray3};
          `}
        >
          <FieldContainer>
            <FieldLabel htmlFor="attendeeStatusId">Status</FieldLabel>
            <ComboBox
              css={css`
                color: darkblue;
                background-color: ${gray5};
              `}
              {...register('attendeeStatusId')}
              defaultValue={data.attendeeStatusId}
            >
              {status.map((item) => {
                return (
                  <option
                    key={item.attendeeStatusId}
                    value={item.attendeeStatusId}
                    label={item.attendeeStatus}
                  ></option>
                );
              })}
            </ComboBox>
          </FieldContainer>
        </div>

        <div>{`Comment: ${data.requestComment}`}</div>

        <div
          css={css`
            padding-top: 15px;
          `}
        >
          <FieldContainer>
            <FieldLabel htmlFor="requestReply">Your Reply</FieldLabel>
            <FieldInput
              css={css`
                color: darkblue;
                background-color: ${gray5};
              `}
              defaultValue={data.requestReply}
              placeholder={data.requestReply}
              {...register('requestReply', { required: false })}
            />
          </FieldContainer>
        </div>

        <div>
          <FormButtonContainer
            css={css`
              margin-top: 0;
              padding-top: 0;
              margin-bottom: 20px;
              border-top: 0;
            `}
          >
            <PrimaryButton type="submit">Update</PrimaryButton>
          </FormButtonContainer>
          {successfullySubmitted && (
            <SubmissionSuccess
              css={css`
                padding-bottom: 15px;
              `}
            >
              Your registration update was successfully recorded
            </SubmissionSuccess>
          )}
        </div>
      </div>
    </form>
  );
};
